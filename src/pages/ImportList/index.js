import React, { useState, useEffect } from "react";
import ImportListForm from "../../components/ImportListForm/importListForm";
import axios from "axios";
import * as Utils from "../../utils";
import SearchProductsBar from "../../components/SearchProductsForm/searchProductsBar";

let sessionUserInfo = JSON.parse(sessionStorage.getItem(Utils.SESSION_STORE_OWNER));

function ImportList() {
    const [originProducts, setOriginProducts] = useState([]);

    useEffect(() => {
        const getOriginProducts = async () => {
            const apiUrlByProducts = `${process.env.REACT_APP_NODE_SERVER_URL}/api/v1/product/list/${sessionUserInfo._id}`;
            let response = await axios.get(apiUrlByProducts);
            if (response.data.error) {
                console.log(response.data.error);
            } else {
                setOriginProducts(response.data);
            }
        };
        getOriginProducts();
    }, []);

    return (
        <div className="mr-4">
            <p className="menu-title">Import List</p>
            <SearchProductsBar placeHolder={Utils.SEARCH_PLACEHOLDER_KEYWORDS} />
            <div className="container mt-5">
                {originProducts.map((product, index) => {
                    return <ImportListForm key={index} originProduct={product} />;
                })}
            </div>
        </div>
    );
}

export default ImportList;
