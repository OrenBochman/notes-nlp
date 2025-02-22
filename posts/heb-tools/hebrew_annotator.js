import { html, css, LitElement } from 'https://cdn.jsdelivr.net/npm/lit@3.1.2/+esm';
//import { html, css, LitElement } from 'lit';

export class HebrewAnnotator extends LitElement {
  static styles = css`
    :host {
      display: block;
      direction: rtl;
      font-family: "Noto Sans Hebrew", sans-serif;
      padding: 1rem;
    }
    .word-container {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .segment {
      padding: 0.2rem 0.4rem;
      border: 1px solid gray;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.5rem;
    }
    .segment.selected {
      background-color: lightblue;
    }
    .annotation-panel {
      margin-top: 1rem;
      border: 1px solid #ccc;
      padding: 1rem;
      border-radius: 4px;
      background: #f9f9f9;
    }
  `;

  static properties = {
    text: { type: String },
    segments: { type: Array },
    selectedSegment: { type: Object },
    annotation: { type: String }
  };

  constructor() {
    super();
    this.text = "";
    this.segments = [];
    this.selectedSegment = null;
    this.annotation = "";
  }

  handleInput(e) {
    this.text = e.target.value;
  }

  segmentText() {
    this.segments = this.text.split(/(?=[ְ-ּׁׂ])/g); // Split by diacritics
  }

  selectSegment(index) {
    this.selectedSegment = this.segments[index];
    this.annotation = "";
  }

  updateAnnotation(e) {
    this.annotation = e.target.value;
  }

  render() {
    return html`
      <input type="text" @input="${this.handleInput}" placeholder="הקלד טקסט כאן"/>
      <button @click="${this.segmentText}">פצל טקסט</button>
      <div class="word-container">
        ${this.segments.map((segment, index) => html`
          <span class="segment ${this.selectedSegment === segment ? 'selected' : ''}" @click="${() => this.selectSegment(index)}">
            ${segment}
          </span>
        `)}
      </div>
      ${this.selectedSegment ? html`
        <div class="annotation-panel">
          <h3>הערת קטע: ${this.selectedSegment}</h3>
          <input type="text" @input="${this.updateAnnotation}" placeholder="הקלד תיאור או תרגום"/>
          <p>תיאור: ${this.annotation}</p>
        </div>
      ` : ""}
    `;
  }
}

customElements.define('hebrew-annotator', HebrewAnnotator);
