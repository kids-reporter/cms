import config from '../config'
import { graphql, list } from '@keystone-6/core'
import { timestamp, text, file, virtual } from '@keystone-6/core/fields'
import {
  allowAllRoles,
  allowRoles,
  RoleEnum,
} from './utils/access-control-list'

const listConfigurations = list({
  fields: {
    name: text({
      label: '標題',
      validation: { isRequired: true },
      isIndexed: true,
    }),
    file: file({
      label: '上傳 PDF 檔案',
      storage: 'files',
    }),
    googleDrivePreviewLink: text({
      label: 'Google Drive Preview Link',
    }),
    description: text({
      label: '檔案說明',
    }),
    embeddedCode: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item: Record<string, unknown>) {
          const filename = item?.file_filename
          if (typeof filename !== 'string' || filename === '') {
            return ''
          }
          const pdfURL = `${config.googleCloudStorage.origin}/files/${filename}`
          return createEmbedCode(pdfURL, `kids-reporter-embed-pdf-${item.id}`)
        },
      }),
      ui: {
        views: './lists/views/embedded-code',
      },
    }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
    updatedAt: timestamp({
      db: {
        updatedAt: true,
      },
    }),
  },

  access: {
    operation: {
      query: allowAllRoles(),
      create: allowRoles([
        RoleEnum.Owner,
        RoleEnum.Admin,
        RoleEnum.Editor,
        RoleEnum.Contributor,
      ]),
      update: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
      delete: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
    },
  },
  ui: {
    label: 'PDF',
    singular: 'PDF',
    plural: 'PDFs',
    listView: {
      initialColumns: ['name', 'description'],
      initialSort: { field: 'updatedAt', direction: 'ASC' },
      pageSize: 50,
    },
    path: 'pdf',
  },

  hooks: {},
})

function createEmbedCode(pdfURL: string, htmlId: string): string {
  const attrName = 'data-' + htmlId
  const tmpl = `
<div style="padding-bottom: 60%; position: relative; overflow: scroll; width: 100%;">
  <div id="${htmlId}" style="position: absolute; width: 100%;">
    <div data-pdfjs class="pdfViewer"></div>
    <!-- fallback for older Safari below version 15.4 -->
  </div>
  <iframe data-google-drive src="${pdfURL}" width="100%" height="100%" allow="autoplay" style="display: none; position: absolute;"></iframe>
</div>

<script type="module">
  import "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.1.392/legacy/build/pdf.mjs";
  import "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.1.392/legacy/web/pdf_viewer.mjs";

  function getSafariVersion() {
      const ua = navigator.userAgent;
      const safariMatch = ua.match(/Version\\/(\\d+\\.\\d+)/);

      if (safariMatch && ua.includes("Safari") && !ua.includes("Chrome")) {
          return parseFloat(safariMatch[1]);
      } else {
          return -1;
      }
  }

  const supportVersion = 15.4;
  const safariVersion = getSafariVersion();

  if (safariVersion > 0 && safariVersion <= supportVersion) {
    // For older Safari browser
    const container = document.querySelector("#${htmlId} + iframe[data-google-drive]");
    container.style.display = "block";
  } else {
    // For modern browsers, use pdfjs library to present pdf.

    // The workerSrc property shall be specified.
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.1.392/legacy/build/pdf.worker.mjs";

    const container = document.getElementById("${htmlId}");

    const eventBus = new pdfjsViewer.EventBus();

    const pdfViewer = new pdfjsViewer.PDFViewer({
      container,
      eventBus,
    });

    eventBus.on("pagesinit", function () {
      // We can use pdfViewer now, e.g. let's change default scale.
      pdfViewer.currentScaleValue = "page-fit";
    });

    // Loading document.
    const loadingTask = pdfjsLib.getDocument({
      url: "${pdfURL}"
    });

    try {
      const pdfDocument = await loadingTask.promise;
      // Document loaded, specifying document for the viewer
      pdfViewer.setDocument(pdfDocument);
    } catch(error) {
      console.error("${pdfURL} can not be fetched.", error)
    }

    // add pdf custom styles
    const head = document.head;
    const fragment = document.createDocumentFragment();
    const styleEle = document.querySelector("head > style[${attrName}]");

    if (styleEle) {
      head.removeChild(styleEle);
    }

    const newStyleEle = document.createElement("style");
    newStyleEle.setAttribute("${attrName}", "");
    newStyleEle.innerText = "#${htmlId} .pdfViewer .page { margin-left: auto; margin-right: auto; }";
    fragment.appendChild(newStyleEle);
    head.appendChild(fragment);
  }
</script>
  `
  return tmpl
}

export default listConfigurations
