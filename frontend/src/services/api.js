import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; 


const getAuthToken = () => localStorage.getItem('auth-token');

export const getBooks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/books/`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};

export const addBook = async (book) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/books/`, book, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding book:", error);
      throw error;
    }
};

export const searchBooksByAuthor = async (authorId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/books/filter?author_ids=${authorId}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error searching books by author:", error);
        throw error;
    }
};

export const addAuthor = async (author) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/authors/`, author, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding author:", error);
      throw error;
    }
};

export const getAuthors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/authors/`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching authors:", error);
      throw error;
    }
};


  export const userLogin = async (auth) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/authorization/signin/`, auth);
      return response.data;
    } catch (error) {
      console.error("Error adding book:", error);
      throw error;
    }
  };

  export const userRegister = async (auth) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/authorization/signup/`, auth);
      return response.data;
    } catch (error) {
      console.error("Error adding book:", error);
      throw error;
    }
  };


  // export const userMe = async (auth) => {
  //   try {
  //     const response = await axios.post(`${API_BASE_URL}/authorization/me/`, auth);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error adding book:", error);
  //     throw error;
  //   }
  // };


