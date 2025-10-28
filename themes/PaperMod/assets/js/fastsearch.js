import * as params from '@params';

let fuse;
let resList = document.getElementById('searchResults');
let sInput = document.getElementById('searchInput');
let first, last, current_elem = null;
let resultsAvailable = false;
let searchData = null;
let isLoading = false;
let searchDebounceTimer = null;

const DEBOUNCE_DELAY = 200;
const MIN_SEARCH_LENGTH = 2;
const MAX_RESULTS = 20;

function loadSearchIndex() {
    if (isLoading || searchData) return;
    
    isLoading = true;
    
    const statusMessage = document.createElement('div');
    statusMessage.className = 'search-loading';
    statusMessage.textContent = 'Carregando índice de busca...';
    statusMessage.style.padding = '10px';
    statusMessage.style.color = 'var(--secondary)';
    resList.appendChild(statusMessage);
    
    fetch('../index.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar índice de busca');
            }
            return response.json();
        })
        .then(data => {
            searchData = data;
            
            const options = {
                isCaseSensitive: false,
                includeScore: true,
                shouldSort: true,
                findAllMatches: false,
                minMatchCharLength: MIN_SEARCH_LENGTH,
                
                location: 0,
                threshold: 0.3,
                distance: 50,
                ignoreLocation: false,
                
                keys: [
                    { name: 'title', weight: 0.7 },
                    { name: 'summary', weight: 0.2 },
                    { name: 'content', weight: 0.1 }
                ]
            };
            
            if (params.fuseOpts) {
                Object.assign(options, {
                    isCaseSensitive: params.fuseOpts.iscasesensitive ?? options.isCaseSensitive,
                    includeScore: params.fuseOpts.includescore ?? options.includeScore,
                    shouldSort: params.fuseOpts.shouldsort ?? options.shouldSort,
                    findAllMatches: params.fuseOpts.findallmatches ?? options.findAllMatches,
                    minMatchCharLength: params.fuseOpts.minmatchcharlength ?? options.minMatchCharLength,
                    threshold: params.fuseOpts.threshold ?? options.threshold,
                    distance: params.fuseOpts.distance ?? options.distance,
                    location: params.fuseOpts.location ?? options.location,
                    ignoreLocation: params.fuseOpts.ignorelocation ?? options.ignoreLocation,
                    keys: params.fuseOpts.keys ?? options.keys
                });
            }
            
            fuse = new Fuse(searchData, options);
            
            resList.removeChild(statusMessage);
            isLoading = false;
            
            if (sInput.value.trim().length >= MIN_SEARCH_LENGTH) {
                executeSearch(sInput.value.trim());
            }
        })
        .catch(error => {
            console.error('Erro ao carregar busca:', error);
            statusMessage.textContent = 'Erro ao carregar busca. Tente novamente.';
            statusMessage.style.color = 'var(--primary)';
            isLoading = false;
        });
}

function executeSearch(term) {
    if (!fuse || term.length < MIN_SEARCH_LENGTH) {
        if (term.length > 0 && term.length < MIN_SEARCH_LENGTH) {
            resList.replaceChildren();
            const hint = document.createElement('div');
            hint.style.padding = '10px';
            hint.style.color = 'var(--secondary)';
            hint.textContent = `Digite pelo menos ${MIN_SEARCH_LENGTH} caracteres para buscar`;
            resList.appendChild(hint);
        }
        resultsAvailable = false;
        return;
    }
    
    const limit = params.fuseOpts?.limit || MAX_RESULTS;
    const results = fuse.search(term, { limit });
    
    if (results.length === 0) {
        resList.replaceChildren();
        const noResults = document.createElement('div');
        noResults.style.padding = '10px';
        noResults.style.color = 'var(--secondary)';
        noResults.textContent = 'Nenhum resultado encontrado';
        resList.appendChild(noResults);
        resultsAvailable = false;
        return;
    }
    
    const fragment = document.createDocumentFragment();
    
    results.forEach(result => {
        const li = document.createElement('li');
        li.className = 'post-entry';
        
        const a = document.createElement('a');
        a.href = result.item.permalink;
        a.setAttribute('aria-label', result.item.title);
        
        const header = document.createElement('header');
        header.className = 'entry-header';
        header.textContent = result.item.title + '\u00A0»';
        
        a.appendChild(header);
        li.appendChild(a);
        fragment.appendChild(li);
    });
    
    resList.replaceChildren(fragment);
    
    resultsAvailable = true;
    first = resList.firstChild;
    last = resList.lastChild;
}

function handleSearchInput() {
    clearTimeout(searchDebounceTimer);
    
    const term = this.value.trim();
    
    if (!searchData && !isLoading) {
        loadSearchIndex();
    }
    
    if (term.length === 0) {
        reset();
        return;
    }
    
    searchDebounceTimer = setTimeout(() => {
        executeSearch(term);
    }, DEBOUNCE_DELAY);
}

function activeToggle(ae) {
    const focusedElements = document.querySelectorAll('.focus');
    focusedElements.forEach(element => element.classList.remove('focus'));
    
    if (ae) {
        ae.focus();
        current_elem = ae;
        ae.parentElement.classList.add('focus');
    }
}

function reset() {
    resultsAvailable = false;
    resList.replaceChildren();
    sInput.value = '';
    sInput.focus();
}

if (sInput) {
    sInput.addEventListener('input', handleSearchInput);
    
    sInput.addEventListener('focus', () => {
        if (!searchData && !isLoading && sInput.value.trim().length >= MIN_SEARCH_LENGTH) {
            loadSearchIndex();
        }
    }, { once: false });
    
    sInput.addEventListener('search', function(e) {
        if (!this.value) {
            reset();
        }
    });
}

document.addEventListener('keydown', function(e) {
    const key = e.key;
    let ae = document.activeElement;
    
    const inbox = document.getElementById('searchbox')?.contains(ae);
    
    if (ae === sInput) {
        const elements = document.getElementsByClassName('focus');
        while (elements.length > 0) {
            elements[0].classList.remove('focus');
        }
    } else if (current_elem) {
        ae = current_elem;
    }
    
    if (key === 'Escape') {
        reset();
    } else if (!resultsAvailable || !inbox) {
        return;
    } else if (key === 'ArrowDown') {
        e.preventDefault();
        if (ae === sInput) {
            activeToggle(resList.firstChild?.lastChild);
        } else if (ae.parentElement !== last) {
            activeToggle(ae.parentElement.nextSibling?.lastChild);
        }
    } else if (key === 'ArrowUp') {
        e.preventDefault();
        if (ae.parentElement === first) {
            activeToggle(sInput);
        } else if (ae !== sInput) {
            activeToggle(ae.parentElement.previousSibling?.lastChild);
        }
    } else if (key === 'ArrowRight' || key === 'Enter') {
        ae.click();
    }
});
