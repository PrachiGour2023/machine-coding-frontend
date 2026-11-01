interface DataState {
    id: number | string;
    name: string;
    age: number;
}

export default function DataItem <T>(item: T): T {
   return item;
}