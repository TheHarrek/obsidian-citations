import { App, Editor, Plugin, Modal, Setting, MarkdownView, moment } from "obsidian";

// huetoansu

class globals {
  cursor: any;
};


export class modal extends Modal {
  constructor(app: App, title: string) {
    super(app);
    title = title;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h1", { text: "Citation" });
    new Setting(contentEl)
      .setName("Source")
      .addText((text) =>
        text.onChange((value) => {
          this.source = value
        }));
    new Setting(contentEl)
      .setName("Title")
      .addText((text) =>
        text.onChange((value) => {
          this.title = value
        }));
    new Setting(contentEl)
      .setName("Authors")
      .addText((text) =>
        text.onChange((value) => {
          this.author = value
        }));
    new Setting(contentEl)
      .setName("Date Published")
      .addText((text) =>
        text.onChange((value) => {
          this.date = value
        }));
    new Setting(contentEl)
    .addButton((btn) =>
      btn
        .setButtonText("Auto")
        .setCta()
        .onClick(() => {
          this.dateViewed = moment().format("DD-MM-YYYY"); // Needs to set to today
      }))
      .setName("Date Viewed")
      .addText((text) =>
        text.onChange((value) => {
          this.dateViewed = value
        }));
    new Setting(contentEl)
      .addButton((btn) =>
        btn
          .setButtonText("Submit")
          .setCta()
          .onClick(() => {
            this.close();
            this.onSubmit(this)
          }));
  }
  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
  onSubmit(a) {
    new Notice("Citation Added");
    const editor = this.app.workspace.getActiveViewOfType(MarkdownView).editor;
    editor.replaceRange((`${a.author} ${a.date}, ${a.title}, Viewed ${a.dateViewed}, ${a.source}`), globals.cursor);
  }
  }


export default class ExamplePlugin extends Plugin {

  async onload() {
    this.addCommand({
      id: "add-citation",
      name: "Add Citation",
      editorCallback: (editor: Editor) => {
        globals.cursor = editor.getCursor();
        new modal(this.app).open();
      }
    });
    
  }



  async onunload() {

  }
}
