import {IFileLoader} from "@/models/IFileLoader";
import {FileLoaders} from "@/models/FileLoaders";

let FileModelId = 0;

export class FileModel {

    readonly id = ++FileModelId;
    readonly filename: string;
    readonly extension: string;
    readonly loader: IFileLoader;

    public textContent = "";

    constructor(private readonly file: File) {
        this.filename = file.name;
        this.extension = file.name.replace(/^.*\.(\w+)$/, '$1').toLowerCase();
        this.loader = FileLoaders.filter(it => it.extension === this.extension)[0];
        if (!this.loader) {
            throw new Error(`Unknown file extension ${this.filename}`);
        }
    }

    async load() {
        this.textContent = await this.loader.load(this.file);
    }

    async save() {
        await this.loader.save(this.textContent, this.filename);
    }
}