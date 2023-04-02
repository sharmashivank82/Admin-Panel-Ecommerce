import { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import product from "../../API/product";
import mainContext from "../../Context/mainContext";
import upload from "../../API/upload";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Product() {

    const style = {
        mybtn: {
            padding: '10px 20px',
            borderRadius: '4px',
            backgroundColor: '#4CAF50',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight:'bold',
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
        },

        heading: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px'
        },

        bgcontainer :{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            background: '#0000007d',
            top: '0',
            left: '0',
        },

        boarddata: {
            width: '50vw',
            height: '70vh',
            backgroundColor: 'white',
            position: 'relative',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }

        // btnContainer: {
        //     display: 'flex',
        //     alignItems: 'center',
        //     gap: '10px',
        //     padding: '11px'
        // }
    }

    const { limit } = useContext(mainContext);
    const [pageno, setPageno] = useState(1);
    const [productList, setProductList] = useState([]);
    const [totalProdutc, setTotalProduct] = useState(0);
    const [img, setImg] = useState('');
    const initialState = { name: '', image: '', price: '' }
    const [addProduct, setAddProduct] = useState(initialState);
    const { name, image, price } = addProduct;

    const [isAdd, setisAdd] = useState(false);
    const [isEdit, setisEdit] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddProduct({ ...addProduct, [name]: value });
    }

    const getProductList = async(page) => {
        const res = await product.getProductList({ limit, page });
        if(res && res.status === 200){
            setProductList(res.data.data.products)
            setTotalProduct(res.data.data.totalCount)
        }
    }

    const getList = async(page = 1) => {
        const res = await getProductList(page)
    }

    const handleDelete = async(id) => {
        const res = await product.deleteProduct({ _id: id });
        if(res && res.status === 200){
            window.alert('product is deleted successfully');
        }
    }

    const handleNext = () => {
        let prev = pageno;
        setPageno((prev) => (prev+1));
        getProductList(prev+1);
    }

    const handlePrev = () => {
        let prev = pageno;
        setPageno((prev) => (prev-1));
        getProductList(prev-1);
    }

    useEffect(() => {
        getList(1)
    }, [])

    const changeAvatar = async(e) => {
        const res = await upload.uploadPhoto(e.target.files[0])
        setImg(res.data.media.path);
        console.log({ res: res.data.media.path })
        setAddProduct({ ...addProduct, image: res.data.media.path });
    }

    const handleData = async() => {
        let data = addProduct;
        const res = await product.createProduct(data);
        if(res && res.status === 200){
            window.alert('Product is created success fully');
            getList();
        }else{
            console.error(res);
        }
    }

    const handleEdit = (item) => {
        setisEdit(!isEdit);
        setAddProduct(item);
    }

    const saveEdit = async() => {
        const res = await product.updateProduct(addProduct);
        if(res && res.status === 200){
            window.alert('Product is updated success fully');
            getList();
        }else{
            console.error(res);
        }
    }

  return (
    <>
        <div>
            <button style={style.mybtn} onClick={() => setisAdd(!isAdd)}>ADD Product</button>
            <br />Total :: {totalProdutc}<br />
            <div style={style.heading}>
                <h3>Name</h3>
                <h3>Image</h3>
                <h3>Price</h3>
                <h3>Edit</h3>
                <h3>Delete</h3>
            </div>

            {
                productList && productList.map((item, index) => {
                    return (
                        <div style={style.heading} key={index}>
                            <h3>{item.name}</h3>
                            <div>
                                <img src={`${SERVER_URL}/${item.image}`} alt="img" width="55px;" />
                            </div>
                            <h3>{item.price}</h3>
                            <button style={style.mybtn} onClick={() => handleEdit(item)}>Edit</button>
                            <button style={style.mybtn} onClick={() => handleDelete(item._id)}>Delete</button>
                        </div>
                    )
                })
            }

            { pageno > 1 && <button style={style.mybtn} onClick={handlePrev}>Prev Page</button> }<br /><br />
            <h3>Current Page {pageno}</h3><br />
            { Math.ceil(totalProdutc/limit) > pageno && <button style={style.mybtn} onClick={handleNext}>Next Page</button> }

        </div>

        {  isAdd && 
            <div style={style.bgcontainer}>
                <div style={style.boarddata}>
                    <button style={style.mybtn} onClick={() => setisAdd(!isAdd)}>Close</button><br /><br />
                    <br />
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name' value={name} onChange={handleChange} style={{ border: '1px solid' }} />
                    <br />
                    <label htmlFor='price'>Price</label>
                    <input type='text' id='price' name='price' style={{ border: '1px solid' }} value={price} onChange={handleChange} />
                    <br />
                    <label htmlFor='file'>File</label>
                    <input type='file' id='file' accept=".jpg, .jpeg, .png" onChange={changeAvatar} name='image' />
                    <br /><br />
                    {img !== '' && <><img src={`${SERVER_URL}/${img}`} style={{ width: '50px' }} /> <br /><br /></>}
                    <button style={style.mybtn} onClick={handleData} >Add Data</button>
                </div>
            </div>
        }

        {
            isEdit &&
            <div style={style.bgcontainer}>
                <div style={style.boarddata}>
                    <button style={style.mybtn} onClick={() => setisEdit(!isEdit)}>Close</button><br /><br />
                    <br />
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name' value={name} onChange={handleChange} style={{ border: '1px solid' }} />
                    <br />
                    <label htmlFor='price'>Price</label>
                    <input type='text' id='price' name='price' style={{ border: '1px solid' }} value={price} onChange={handleChange} />
                    <br />
                    <label htmlFor='file'>File</label>
                    <input type='file' id='file' accept=".jpg, .jpeg, .png" onChange={changeAvatar} name='image' />
                    <br /><br />
                    {img !== '' && <><img src={`${SERVER_URL}/${img}`} style={{ width: '50px' }} /> <br /><br /></>}
                    <button style={style.mybtn} onClick={saveEdit} >Edit Data</button>
                </div>
            </div>
        }

        <br /><br />
        <button style={style.mybtn} onClick={() => navigate('/coupon')}>Proceed to Coupon</button>

    </>
  )
}

export default Product