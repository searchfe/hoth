import {Service} from '@hoth/decorators';

@Service()
export default class Calculator {
    add(a: number, b: number) {
        return a + b;
    }
}
