interface Data {
    title: string;
    content: string;
}

export class Controller {
    logger: any = null;
    constructor(option: any) {
        this.logger = option.logger;
    }

    render(data: Data) {
        return `mock controller ${data.title} ${data.content}`;
    }
}
