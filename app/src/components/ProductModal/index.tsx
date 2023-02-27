import React from "react";
import { FlatList, Modal } from "react-native";
import { Product } from "../../types/Product";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
 
import {Text} from '../Text';
import { formatCurrency } from "../utils/formatCurrency";

import { Image,
        CloseButton, 
        Header, 
        ModalBody,
        IngredientsContainer,
        Ingredient,
        Footer,
        FooterContainer,
        PriceContainer } from "./styles";



interface ProductModalProps{
    visible:boolean;
    onClose: () => void;
    product:null | Product;
    onAddToCart:(product:Product) => void;
    
}

export function ProductModal({visible, onClose,product,onAddToCart}:ProductModalProps) {
    if(!product){
        return null
    }

    function handleAddToCart(){
        onAddToCart(product!);
        onClose();
    }


    return(
        <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={onClose}
        >
          <Image source={{uri:`http://192.168.0.119:3001/uploads/${product.imagePath}`}}
          
          ></Image>

          <CloseButton onPress={onClose}>
            <Close/>
          </CloseButton>

           <ModalBody>
             <Header>
                <Text size={24} weight="600">{product.name}</Text>
                <Text color="#666" style={{marginTop:8}}>
                    {product.description}
                    </Text>
             </Header>
              {product.ingredients.length > 0 && (
                
             <IngredientsContainer>
             <Text weight="600" color="">Ingredintes</Text>

             <FlatList
             data={product.ingredients}
             keyExtractor={ingredient => ingredient._id}
             showsVerticalScrollIndicator={false}
             renderItem={({item:ingredient})=>(
                 <Ingredient>
                     <Text>{ingredient.icon}</Text>
                     <Text size={14} color="#666" style={{marginLeft:20}}>
                         {ingredient.name}
                         </Text>
                 </Ingredient>
              )}

                />
             </IngredientsContainer>
              )}
           </ModalBody>

           <Footer>
                <FooterContainer>
                    <PriceContainer>
                        <Text color="#666">Preço</Text>
                        <Text size={20} weight="600">{formatCurrency(product.price)}</Text>
                    </PriceContainer>

                    <Button onPress={handleAddToCart}>
                        Adicionar ao Pedido

                    </Button>
                </FooterContainer>
             </Footer>

        </Modal>
    );
}

function onAddToCart(product: Product | null) {
    throw new Error("Function not implemented.");
}
