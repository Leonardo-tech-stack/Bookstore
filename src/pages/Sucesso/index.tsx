import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../components/store';
import Product from '../../types/product';
import { DivSucesso, Back, Ul, Li, Total } from './styles';

const Success: React.FC = () => {
  const products = useSelector((state: RootState) => state.cart.products);
  const productList = Object.values(products);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return productList.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
  };

  // Aba
  useEffect(() => {
    const total = calculateTotal();
    document.title = `Carrinho (${productList.length}) - Total: ${total}$`;

    localStorage.setItem('cart', JSON.stringify(products));

    // Verifica se há produtos no carrinho. Se não houver, redireciona para a página inicial.
    if (productList.length === 0) {
      navigate('/');
    }
  }, [productList, products, navigate]);

  return (
    <div>
      <div>
        <DivSucesso>
          <h2>Compra realizada com sucesso!</h2>
          <p>Obrigado por fazer sua compra.</p>
          <p>Seu pedido foi processado e em breve será enviado.</p>
        </DivSucesso>

        <Back as={Link} to="/produtos">Continuar comprando</Back>

        <Ul>
          {productList.map((product: Product) => (
            <Li key={product.id}>
              <div>
                <h1>{product.name}</h1>
                <p>Quantidade: <b>({product.quantity})</b></p>
                <p>Subtotal: <b>$ {product.quantity * product.price}</b></p>
                <p>{product.description}</p>
                <p>{product.category}</p>
              </div>
            </Li>
          ))}
        </Ul>

        <Total>Total: $ {calculateTotal()}</Total>
      </div>
    </div>
  );
};

export default Success;
