
    export interface Validation {
        type: string;
        match: string;
        regex: boolean;
        fail_if_found: boolean;
    }

    export interface Validate {
        validation: Validation;
    }

    export interface Wait {
        wait_for: string;
    }

    export interface Locator {
        type: string;
        locator: string;
    }

    export interface Action2 {
        description: string;
        step: number;
        actioncpeform: string;
        validate: Validate;
        url: string;
        wait: Wait;
        locators: Locator[];
        button?: number;
        text: string;
    }

    export interface Action {
        action: Action2;
    }

    export interface Tag2 {
        context: string;
        key: string;
    }

    export interface Tag {
        tag: Tag2;
    }

    export interface Test {
        name: string;
        id: string;
        template: string;
        actions: Action[];
        tags: Tag[];
    }

    export interface ObservabilityFile {
        apiVersion: string;
        cmdbAppShortName: string[];
        squads: number[];
        base_url: string;
        numberofsteps: number;
        tests: Test[];
    }


