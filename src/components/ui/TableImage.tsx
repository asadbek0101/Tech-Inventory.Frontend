
import "./assets/table-image.scss";

interface Props{
    readonly image?: string;
    readonly size?: string;
}

export default function TableImage({
    image = "",
    size
}:Props){
    return (
        <div className="table-image"
            style={{
                width: size,
                height: size,
            }}
            >
            <img src={image} width="100%" height="100%" alt="" />
        </div>
    )
}