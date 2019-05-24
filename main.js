'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const body = document.querySelector('body');
    const blocks = document.querySelectorAll('.block');
    const blockHeader = document.querySelector('.block-header');
    const collapsedBlockHeight = blockHeader.clientHeight;

    blocks.forEach( block => {
        block.style.maxHeight = block.scrollHeight + 'px';
        block.style.height = block.clientHeight + 'px';
    });

    // убираем у css-правила .block-active свойство "height:auto";
    clearHeightAutoRule();

    function expandBlock(block) {
        block.style.height = parseInt(block.style.maxHeight) + 'px';
        block.querySelector('.block-header').classList.add('block-header-active');
    }

    function collapseBlock(block) {
        block.style.height = collapsedBlockHeight + 'px';
        block.querySelector('.block-header').classList.remove('block-header-active');
    }

    body.addEventListener('click', (e) => {
        if (!(e.target.classList.contains('block-header'))) {
            return;
        }

        blocks.forEach( block => {
            if (block === e.target.parentNode) {
                block.classList.toggle('block-active');
            } else {
                block.classList.remove('block-active');
            }
            if (block.classList.contains('block-active')) {
                expandBlock(block);
            } else {
                collapseBlock(block);
            }
        });

    });

});


function clearHeightAutoRule() {
    let rules = [];
    const sheets = Array.from(document.styleSheets);
    sheets.forEach( sheet => {
        try { rules.push(...sheet.cssRules); } catch (e) { }
    });
    for (let i=0; i<rules.length; i++) {
        if (rules[i].selectorText.toLowerCase() === '.block-active') {
            rules[i].styleMap.clear();
            break;
        }
    }
};
