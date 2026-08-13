import Tooltip from '@mui/material/Tooltip';



type tooltips_PosProps = {
    pos: "tooltip-bottom" | "tooltip-top" | "tooltip-right" | "tooltip-left" | undefined;
}

const ToolTip_ui = ({imgIndicator,alt_text,contentText, toolTipPos}:{imgIndicator:string, alt_text:string, contentText: string, toolTipPos: tooltips_PosProps["pos"]})=>{
    return (
       /* <div className={`tooltip ${toolTipPos}` }>
            <div className="tooltip-content rounded-lg">
                <p className="text-left p-2">
                    {contentText}
                </p>
            </div>
            <img src={imgIndicator} alt={alt_text}/>
        </div>*/

        <Tooltip title={contentText} placement={"bottom-end"}>
            <img src={imgIndicator} alt={alt_text}/>
        </Tooltip>
    )
}




export default ToolTip_ui;