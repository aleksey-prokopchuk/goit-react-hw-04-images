import { useState, useEffect } from "react";
import Searchbar from './Searchbar/Searchbar';
import { searchImage } from '../api/image';
import Loader from "./Loader/Loader";
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from './App.module.css';

const { app } = css;

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      
      try {
        const data = await searchImage(search, page);
        setItems((prevItems) => {
          return [...prevItems, ...data.hits];
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      };
    };
    if (search !== '') {
      fetchImage();
    };
  }, [search, page]);



  const onSearch = ({ search }) => {
    setSearch(search);
  };

  const openModal = (modalContent) => {
      const {largeImageURL, tags} = modalContent
    setModalOpen(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const closeModal = () => {
    setModalOpen(false);
    setLargeImageURL('');
    setTags('');
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1 )
  };

  return (
      <div className={app}>
        <Searchbar onSubmit={onSearch} />
        {modalOpen && <Modal items={items} onClose={closeModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>}
        {!!items.length && <ImageGallery items={items} onClick={openModal} />}
        {loading && <Loader />}
        {error && <p>Something went wrong !</p>}
        {!!items.length && < Button onClick={loadMore} title='Load more' />}
      </div>
    );
};

export default App;
