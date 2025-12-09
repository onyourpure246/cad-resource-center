import QrCode from "@/assets/img/qrcode_lineofficial.png";
import LogoWhite from "@/assets/img/logo-white.png";

import { FooterData } from '@/types/footer';

export const footerData: FooterData = {
    logo: {
        src: LogoWhite,
        alt: "Department Logo",
    },
    columns: [
        {
            title: "ติดต่อสอบถาม",
            content: [
                { type: "text", value: "สามารถติดต่อได้ที่ 020168888 ต่อ" },
                {
                    type: "list",
                    items: [
                        "4343 [ ผอ.กรส. ]",
                        "4344 [ CAD-WP, ACL/CATS ]",
                        "4346 [ CAD-WP, ACL ]",
                        "4345 [ CAD-WP ]",
                        "4329 [ CAD-WP ]",
                        "4349 [ CAD-WP ]"
                    ]
                }
            ],
        },
        {
            title: "ช่องทางอื่นๆ",
            content: [
                { type: "text", value: "สายด่วน 0-2628-5746" },
                { type: "text", value: "Email : Itaudit@cad.go.th" },
            ],
        },
        {
            title: "Line Official",
            content: [
                {
                    type: "image",
                    src: QrCode,
                    alt: "Line Official QR Code",
                    width: 150,
                    height: 150
                },
            ],
        },
    ],
};
