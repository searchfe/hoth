import type Piscina from 'piscina';


type PiscinaOptions = ConstructorParameters<typeof Piscina>['0'];
export interface PluginOptions {
    piscinaOptions: PiscinaOptions;
}
