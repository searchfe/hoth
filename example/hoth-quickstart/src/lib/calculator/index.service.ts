import {getFastifyInstanceByAppName, Service} from '@hoth/decorators';

@Service()
export default class Calculator {

    private service = getFastifyInstanceByAppName('quickstart');

    add(a: number, b: number) {
        return a + b + this.service.$appConfig.get('test');
    }
}
