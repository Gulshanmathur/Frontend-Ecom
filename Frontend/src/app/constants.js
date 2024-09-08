export const ITEMS_PER_PAGE = 12;
export function discountedPrice(item){    
    return Math.round(item.price * (1 - item.discountPercentage / 100));
}

//s%3AG-EgpNdcFyLAkbqo8qY4uc_o0Jp0eqAA.A%2B5Ph77RblouZPiY4FvEkANuU%2Bu7SPDu3BfLZPU9T%2BI