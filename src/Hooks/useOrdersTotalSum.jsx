const useOrdersTotalSum = () => {
    const calculateTotalSum = (order, newTotalSum, count, copybookCount) => {
        if(order.isCopybookChecked && order.isBookChecked){
            newTotalSum += (order.copybookPrice * copybookCount) + (order.bookPrice * count);
        }
        else if(order.isAudioChecked && order.isBookChecked){
            newTotalSum += (order.bookPrice * count) + order.audioPrice;
        }
        else if(order.isAudioChecked) {
            newTotalSum += order.audioPrice;
        }
        else if (order.isBookChecked){
            newTotalSum += order.bookPrice * count;
        }
        else if (order.isCopybookChecked){
            newTotalSum += order.copybookPrice * copybookCount;
        }
        return newTotalSum;
    }
    return {calculateTotalSum};
}

export default useOrdersTotalSum;