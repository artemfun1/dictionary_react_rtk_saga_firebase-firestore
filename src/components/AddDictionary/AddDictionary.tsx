import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGenerateDictionaryItem } from "../../hooks/useGenerateDictionaryItem";
import { createNewDicItem } from "../../redux/features/dictionarySlice/dictionsSlice";
import { useAppDispatch } from "../../redux/store/hooksRedux";
import module from "./addDictionary.module.scss";

export const AddDictionary = ({ isOpen, setIsOpen }: any) => {
	const [name, setName] = useState("");
	const [imgUrl, setImgUrl] = useState("");

	const dispatch = useAppDispatch();

	function handlerChangeName(e: any) {
		setName(e.target.value);
	}

	function handlerChangeImgUrl(e: any) {
		setImgUrl(e.target.value);
	}

	const newObj = useGenerateDictionaryItem(imgUrl, name);

	function handlerSubmit() {
		dispatch(createNewDicItem(newObj));

		setName("");
		setImgUrl("");
		setIsOpen(false);
	}

	const dialog = useRef<HTMLDialogElement>(null);

	function handlerCancelClick(e: any) {
		setName("");
		setImgUrl("");
		setIsOpen(false);
	}

	if (isOpen) {
		dialog.current?.showModal();
	} else {
		dialog.current?.close();
	}

	const addDictionary = (
		<dialog ref={dialog} id="id" className={module.dialog}>
			<form onSubmit={handlerSubmit} action="" method="dialog">
				<p>Создание нового словаря</p>
				<label htmlFor="name">Введите название словаря:</label>
				<input
					autoComplete="off"
					onChange={e => handlerChangeName(e)}
					placeholder="Название"
					type="text"
					name="name"
					id="name"
					value={name}
					required
				/>

				<label htmlFor="img">Вставьте ссылку на картинку:</label>
				<input
					autoComplete="off"
					onChange={e => handlerChangeImgUrl(e)}
					placeholder="Ссылка на картинку"
					type="text"
					name="name"
					id="img"
					value={imgUrl}
					required
				/>

				<div>
					<button
						onClick={e => handlerCancelClick(e)}
						type="button"
						className="btn btn-outline-warning"
					>
						Отмена
					</button>

					<button type="submit" className="btn btn-outline-success">
						Создать
					</button>
				</div>
			</form>
		</dialog>
	);

	return createPortal(
		addDictionary,
		document.getElementById("root") as HTMLElement
	);
};
