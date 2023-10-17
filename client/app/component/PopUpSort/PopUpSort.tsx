import React, { ReactNode, useState } from "react";
import s from './PopUpSort.module.css'
import Image from "next/image";
import useModal from "@/app/hook/useModal";
import done1 from '../../../public/done 1 (1).svg'

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
    value:string;
    name: (obj:string) => void;
    count: (obj:number) => void;
    /*task: (obj:{ id: number; text: string; time: string; performance:boolean}[]) => void;
    objTask: {
      id: number;
      text: string;
      time: string;
      performance: boolean;
  }[];*/
    setSort: (obj:string) => void;
    
  }

export default function PopUpSort (props:ModalType) {


    return (
    <>
      {props.isOpen && props.value === '2' && (
        <div onClick={props.toggle} className={s.modalOverlay}>
          <div /*onClick={(e) => e.stopPropagation()}*/ className={s.modalBox2}>
            {props.children}

            <div className={s.all}>
              <button className={s.allAll}  onClick={() => {props.name('All'), props.setSort(''),props.count(1)}}>
                <Image src={done1} width={25} height={25} alt='yesAll'/>
                All
              </button>
              <button className={s.allDone}  onClick={() => {props.name('Done'),props.setSort('true'),props.count(1)}}>
               <Image src={done1} width={25} height={25} alt='yesDone'/>
               Done
              </button>
              <button className={s.allUndone}  onClick={() => {props.name('Undone'), props.setSort('false'),props.count(1)}}>
                <Image src={done1} width={25} height={25} alt='yesUndone'/>
                Undone 
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}