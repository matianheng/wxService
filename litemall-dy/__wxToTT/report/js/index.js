window.onload = function () {
    renderData();
    tabsInit();

    document.addEventListener('keydown', (event) => {
        const e = event || window.event;
        if (e.keyCode === 27) { // Escape key
            closeModal();
        }
    });

    document.querySelector('#modal-js-example .modal-card-head button.delete')?.addEventListener('click', () => {
        closeModal();
    });
}

function openModal() {
    document.querySelector('#modal-js-example')?.classList.add('is-active');
}

function closeModal() {
    document.querySelector('#modal-js-example')?.classList.remove('is-active');
}

function renderData() {
    renderInfo();
    renderDetails();
}

function renderInfo() {
    const info = recordData.info;
    let html = '';
    Object.entries(info).forEach(([head, value]) => {
        html += `<tr>
        <th class="custom-cell-10">${head}</th>
        <td class="has-text-right">${value}</td>
    </tr>`;
    });
    document.querySelector('table#info tbody').innerHTML = html;
}

function renderDetails() {
    const ttmlData = {};
    const ttssData = {};
    const jsData = {};
    const jsonData = {};

    const detail = recordData?.detail || {};
    Object.entries(detail).forEach(([file, item]) => {
        if (item.type === 'ttml') {
            ttmlData[file] = item;
        } else if (item.type === 'ttss') {
            ttssData[file] = item;
        } else if (item.type === 'javascript') {
            jsData[file] = item;
        } else if (item.type === 'json') {
            jsonData[file] = item;
        }
    });
    renderDetail(ttmlData, 'ttml');
    renderDetail(ttssData, 'ttss');
    renderDetail(jsData, 'javascript');
    renderDetail(jsonData, 'json');
}

function renderDetail(data, id) {
    const tbody = document.querySelector(`#${id} table tbody`);
    let html = '';
    Object.entries(data).sort((a, b) => {
        const aValue = a[1];
        const bValue = b[1];
        return bValue.level - aValue.level;
    }).forEach(([file, value]) => {
        let imgSrc;
        if (value.level === 1) {
            imgSrc = "alert-circle.svg";
        } else if (value.level === 2) {
            imgSrc = "close-circle.svg";
        } else {
            imgSrc = "check-circle.svg";
        }
        html += `<tr class="is-clickable filepath" data-file=${file}>
            <td>
                ${file}
            </td>
            <td class="has-text-centered">
                <img src="./icons/${imgSrc}" style="width:24px;height:24px;" />
            </td>
        </tr>`;
    });
    tbody.innerHTML = html;
    tbody.addEventListener('click', (e) => {
        const targetTr = e.target.closest('.filepath');
        if (targetTr) {
            renderModal(targetTr.dataset.file);
        }
    });
}

function renderModal(file) {
    const value = recordData?.detail[file];
    if (value) {
        document.querySelector('#modal-js-example section .columns .file').innerText = file;
        renderModalContent(value);
        openModal();
    }
}

function renderModalContent(data) {
    const table = document.createElement('table');
    table.setAttribute('class', 'table is-bordered is-fullwidth is-hoverable custom-table has-text-centered');
    const thead = document.createElement('thead');
    thead.setAttribute('class', 'custom-thead');
    const headTr = document.createElement('tr');
    if (data.type === 'ttml') {
        headTr.innerHTML = `
            <th class="has-text-centered">组件名</th>
            <th class="has-text-centered">支持程度</th>
            <th class="has-text-centered">解决方案</th>`;
    } else if (data.type === 'ttss') {
        headTr.innerHTML = `
            <th class="has-text-centered">属性名</th>
            <th class="has-text-centered">支持程度</th>
            <th class="has-text-centered">解决方案</th>`;
    } else if (data.type === 'javascript') {
        headTr.innerHTML = `
            <th class="has-text-centered">API 名称</th>
            <th class="has-text-centered">支持程度</th>
            <th class="has-text-centered">解决方案</th>`;
    } else if (data.type === 'json') {
        headTr.innerHTML = `
            <th class="has-text-centered">属性名称</th>
            <th class="has-text-centered">支持程度</th>
            <th class="has-text-centered">解决方案</th>`;
    }
    thead.appendChild(headTr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    let bodyContent = '';
    data.log?.forEach(item => {
        bodyContent += `<tr>
            <td>
                ${item.name}
            </td>
            <td class="red-text">
                ${item.info}
            </td>
            <td>
                <div>${item.hint}</div>
                ${item.doc ? `<div><a href=${item.doc} target="_blank">帮助文档</a></div>` : ''}
            </td>
        </tr>`
    });
    tbody.innerHTML = bodyContent;
    table.appendChild(tbody);
    const $modalContent = document.querySelector('#modal-js-example #modal-content');
    $modalContent.innerHTML = '';
    $modalContent.appendChild(table);
}

function tabsInit() {
    const tabs = document.querySelectorAll('#detail-tabs ul li') || [];

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tabs, tab);
        });
    });
}

function switchTab($tabs, $targetTab) {
    $tabs.forEach(t => t.classList.remove('is-active'));
    $targetTab.classList.add('is-active');
    const tag = $targetTab?.firstChild.dataset.tag;
    if (tag) {
        const tabContents = document.querySelectorAll('.detail-tab-content .detail-tab-content-panel') || [];
        tabContents.forEach(c => c.classList.add('is-hidden'));
        document.querySelector(`#${tag}`)?.classList.remove('is-hidden')
    }
}