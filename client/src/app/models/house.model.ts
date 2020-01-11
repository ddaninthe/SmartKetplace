export class House {
    constructor(
        public location: string,
        public description: string,
        public roomCount: number,
        public area: number,
        public price: number,
        public documents: number[]
    ) { }
}