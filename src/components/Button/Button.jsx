
import { Button } from "react-bootstrap"

export const ButtonLoadMore = ({loadMore}) =>{
    return( 
        <Button className="mr-auto ml-auto btn" onClick={loadMore}>load more</Button>
    )
}  