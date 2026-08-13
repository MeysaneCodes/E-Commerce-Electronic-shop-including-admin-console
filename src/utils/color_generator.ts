import Colors_List from "@/lib/strings/colors";


export default function generate_color():string{
    const colors_length = Colors_List.baseColors.length;
    const shaders_length = Colors_List.shades.length;
    const Random_Int_Color = Math.floor(Math.random() * colors_length);
    const Random_Int_Shader = Math.floor(Math.random() * shaders_length);
    //console.log("color is ", `${Colors_List.baseColors[Random_Int_Color]}-${Colors_List.shades[Random_Int_Shader]}`)


    return `${Colors_List.TailwindColorHEX[Colors_List.baseColors[Random_Int_Color]][Colors_List.shades[Random_Int_Shader]]}`;
}