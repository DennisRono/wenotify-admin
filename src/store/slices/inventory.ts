import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type {
  InventoryState,
  Product,
  ProductUpdateType,
} from '@/types/inventory'
import { reduxFetchAllProducts } from '@/store/actions/inventory'

const initialState: InventoryState = {
  products: [],
  isLoading: false,
  error: null,
}

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    appendProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload)
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        product => product.id !== action.payload
      )
    },
    updateProduct: (state, action: PayloadAction<ProductUpdateType>) => {
      const index = state.products.findIndex(
        product => product.id === action.payload.id
      )
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload }
      }
    },
    clearProducts: state => {
      state.products = []
    },
    clearError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(reduxFetchAllProducts.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(reduxFetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
        state.error = null
      })
      .addCase(reduxFetchAllProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.message || 'Failed to get products'
      })
  },
})

export const {
  appendProduct,
  removeProduct,
  updateProduct,
  clearProducts,
  clearError,
} = inventorySlice.actions

export default inventorySlice.reducer
