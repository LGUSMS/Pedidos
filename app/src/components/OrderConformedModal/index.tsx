import React from "react";
import { Modal } from "react-native";
import { CheckCircle } from "../Icons/CheckCircle";
import {Container, OkButton} from "./styles";
import { Text } from "../Text";

interface OrderConformedModalProps{
    visible:boolean;
    onOK: () => void;
}

export function OrderConformedModal({visible, onOK}:OrderConformedModalProps){
    return (
        <Modal visible={visible} 
        animationType="fade"
        >

        <Container>
            <CheckCircle/>
            <Text size={20 } weight="600" color="#fff" style={{marginTop:12}}>
                Pedido confirmado
            </Text>
            <Text color="#fff" opacity={0.9} style={{marginTop:4}}>O pedido já entrou na fila de produção!</Text>
        <OkButton onPress={onOK}>
            <Text color="#D73035" weight="600">OK</Text>
        </OkButton>
        
        </Container>


        </Modal>
    )
}