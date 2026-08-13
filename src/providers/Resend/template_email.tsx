import * as React from 'react';


function splitNumberIntoDigits (num:number){
    return num.toString().split("").map(Number);
}


export default function EmailTemplate({inCode}:{inCode:number}) {


    const digits = splitNumberIntoDigits(inCode);


    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                fontFamily: "Arial, sans-serif",
                color: "#111",
            }}
        >
            <div>
                {/* Title */}
                <p style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "18px" }}>
                    Bestätige dein neues MyTemplate-Onlinekonto
                </p>

                <p style={{ marginBottom: "20px", fontSize: "14px" }}>
                    Bitte gib den folgenden Bestätigungs-Code ein:
                </p>

                {/* Code Digits */}
                <div style={{ display: "flex", marginBottom: "24px" }}>
                    {digits.map((digit, index) => (
                        <div
                            key={index}
                            style={{
                                marginLeft: index === 0 ? 0 : "12px",
                                background: "#000",
                                borderRadius: "6px",
                                padding: "12px 18px",
                            }}
                        >
                            <p
                                style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: "22px",
                                    margin: 0,
                                }}
                            >
                                {digit}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Description */}
                <p style={{ marginBottom: "12px", fontSize: "14px", lineHeight: "20px" }}>
                    Gib diesen Code aus Sicherheitsgründen nicht an Dritte weiter,
                    um dein Kundenkonto vor einem unbefugten Zugriff zu schützen.
                </p>

                <p style={{ marginBottom: "16px", fontSize: "14px", lineHeight: "20px" }}>
                    Falls du die Anfrage nicht gestellt hast, ignoriere diese E-Mail einfach.
                </p>

                {/* Footer */}
                <p style={{ fontSize: "14px" }}>Dein MyTemplate-Team</p>
                <a
                    style={{
                        fontSize: "14px",
                        color: "#0066cc",
                        textDecoration: "underline",
                        display: "inline-block",
                        marginTop: "6px",
                    }}
                >
                    www.MyTemplate.com
                </a>
            </div>
        </div>
    );
}