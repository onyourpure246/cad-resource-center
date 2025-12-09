import { StaticImageData } from 'next/image';

export type FooterItem =
    | { type: 'text'; value: string }
    | { type: 'image'; src: string | StaticImageData; alt?: string; width?: number; height?: number }
    | { type: 'list'; items: string[] };

export interface FooterColumn {
    title: string;
    content: FooterItem[];
}

export interface FooterData {
    logo: {
        src: string | StaticImageData;
        alt: string;
    };
    columns: FooterColumn[];
}
