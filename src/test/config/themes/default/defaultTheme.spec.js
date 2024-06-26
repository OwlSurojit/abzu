import { getTiamatEnv } from '../../../../config/themeConfig';
import {getEnvColor, darkColor} from '../../../../config/themes/default/defaultTheme';

describe('getEnvColor', () => {
    test('Development env should be #457645', () => {
        const env = "development";
        expect(getEnvColor(env)).toEqual("#457645");
    });

    test('Test env should be #d18e25', () => {
        const env = "test";
        expect(getEnvColor(env)).toEqual("#d18e25");
    });

    test('Prod env should be darkColor', () => {
        const env = "prod";
        expect(getEnvColor(env)).toEqual(darkColor);
    });

    test('Any other env should be darkColor', () => {
        const env = "foo";
        expect(getEnvColor(env)).toEqual(darkColor);
    });

    test('Empty env should be the same as tiamatEnv', () => {
        const env = null;
        expect(getEnvColor(env)).toEqual(getEnvColor(getTiamatEnv()));
    });
});