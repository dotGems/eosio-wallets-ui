import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as wallet from "../lib/wallet";
import { transfer } from "../lib/actions";

interface QuantityProps {
    setTransactionId: any,
    setQuantity: any,
    actor: string,
    quantity: string,
    protocol: "scatter" | "anchor" | undefined
}

export function Quantity({ setQuantity, setTransactionId, actor, quantity, protocol } : QuantityProps ) {
    const handleClick = async () => {
        setQuantity(quantity);
        const action = transfer( actor, "pomelo", quantity, "donate to Pomelo 🍈");
        const transaction_id = await wallet.pushTransaction([ action ], protocol );
        setTransactionId(transaction_id);
    }

    return (
        <a className={styles.card} onClick={ handleClick }>
            <h2><Image src={ "/eos.svg" } alt={ "EOS" } width={22} height={22} /> { quantity }</h2>
        </a>
    )
}
