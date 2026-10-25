import { IconProps as CoreIconProps, IconData } from '@primeicons/core/types';
import { PropType } from 'vue';
export interface IconProps extends CoreIconProps {
}
export declare const createIcon: (iconData: IconData) => {
    Icon: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        size: {
            type: PropType<number | string>;
            default: undefined;
        };
        color: {
            type: PropType<string>;
            default: undefined;
        };
        spin: {
            type: PropType<boolean>;
            default: boolean;
        };
    }>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        size: {
            type: PropType<number | string>;
            default: undefined;
        };
        color: {
            type: PropType<string>;
            default: undefined;
        };
        spin: {
            type: PropType<boolean>;
            default: boolean;
        };
    }>> & Readonly<{}>, {
        size: string | number;
        color: string;
        spin: boolean;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    props: {
        size: {
            type: PropType<number | string>;
            default: undefined;
        };
        color: {
            type: PropType<string>;
            default: undefined;
        };
        spin: {
            type: PropType<boolean>;
            default: boolean;
        };
    };
};
export type { CoreIconProps, IconData };
