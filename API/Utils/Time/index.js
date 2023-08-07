import { sleep as s } from "./sleep";

export class Time{
    static sleep(ticks){
        return s(ticks);
    }
}