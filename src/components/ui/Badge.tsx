export default function Badge_layout({badges}:{badges:string[]}){
   return (
       <div className="mt-2 flex overflow-scroll scrollbar-hide">
           {badges.map((badge:string,index:number)=>{
               return(
                   <p  key={index} className="border rounded-xl border-red-600 whitespace-nowrap text-gray-500  font-bold  mr-2 text-xs p-1 inline-flex">{badge}</p>
               );
           }
           )
           }
       </div>
   )
}