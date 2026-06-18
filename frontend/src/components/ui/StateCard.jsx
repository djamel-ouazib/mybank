export default function StateCard({ text, data }) {
    return (
        <div className=" w-full h-full ">
            <p className="text-zinc-400 text-sm ">{text}</p>
            <p className=" font-bold text-3xl">€{data}</p>
        </div>
    )
}
