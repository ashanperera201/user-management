export interface IAppContractService {
    getApplicationVersion(): string;
    getApplicationEnvironment(): string;
    getApplicationGreetings(): string;
}