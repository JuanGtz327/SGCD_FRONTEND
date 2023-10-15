import Toastify from 'toastify-js'

export const useToast = () => {
  
  const showToast = (type,message,position="right",gravity="top") => {
    Toastify({
      text: message,
      duration: 1500,
      gravity,
      position,
      style: {
        background: `${type === "success" ? "#10b981" : "#f44336"}`,
      },
    }).showToast();
  }

  return{
    showToast
  }

}