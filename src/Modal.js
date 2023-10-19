import React, { useCallback } from "react";
import { useState, useRef } from "react";
import noImg from "./img/no_img.jpg"; // '이미지가 없습니다' 이미지 변수
import "./modal.css";
// 이미지 파일 선택 및 미리보기
const ImgChoice = (props) => {
  const [imgUrl, setImgUrl] = useState(null);
  const imgRef = useRef();
  const onChangeImage = () => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];
    console.log("file: ", file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgUrl(reader.result);
      console.log("image url: ", reader.result);
    };
  };
  return (
    <>
      <img
        src={imgUrl ? imgUrl : noImg}
        style={{ width: "150px", height: "150px" }}
      />
      <label className="titleImgLabel" htmlFor="titleImg">
        이미지 추가
      </label>
      <input
        type="file"
        ref={imgRef}
        accept="image/*"
        onChange={onChangeImage}
        id="titleImg"
      />
    </>
  );
};
// ---------------------------------------------------------------------
// 모달창
export default function Modal({ isOpen, onClose, clickDate }) {
  // 모달 안의 내용을 저장하는 상태
  const [content, setContent] = useState("");
  const [withName, setWithName] = useState("");
  const [place, setPlace] = useState("");
  const [withOption, setWithOption] = useState("가족");
  const [placeOption, setPlaceOption] = useState("집");
  // -----------------------------
  const [isEditing, setIsEditing] = useState(true); // 편집 모드 상태

  console.log("isopen: ", isOpen);
  console.log("clickDate: ", clickDate);

  if (!isOpen) return null;
  const handleSave = () => {
    if (isEditing) {
      // "저장" 버튼을 클릭하면 모달 내용을 저장합니다.
      // 여기에서는 간단히 콘솔에 출력하도록 합니다.
      console.log("일기:", content);
      console.log("이름: ", withName);
      console.log("장소: ", place);
      console.log("사람: ", withOption);
      alert("저장 완료!");
      setIsEditing(false); // 편집 모드에서 뷰 모드로 전환
      onClose();
    } else {
      // "삭제" 버튼을 누른 경우
      const confirmDelete = window.confirm("삭제하시겠습니까?");
      if (confirmDelete) {
        setContent(""); // 내용 초기화
        setWithName("");
        setPlace("");
        setWithOption("가족");
        setPlaceOption("집");
        setIsEditing(true); // 편집 모드로 전환
      }
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p onClick={onClose} className="closeBtn">
          ❌
        </p>
        <h3 className="modalHeader">{clickDate}의 기록</h3>
        <div className="picBox">
          <h4 className="minititle">대표 사진</h4>
          <ImgChoice />
        </div>
        <div className="withBox">
          <h4 className="minititle">함께한 사람</h4>
          <select
            value={withOption}
            onChange={(e) => setWithOption(e.target.value)}
          >
            <option value={"가족"}>가족</option>
            <option value={"친구"}>친구</option>
            <option value={"연인"}>연인</option>
            <option value={"직장"}>직장</option>
            <option value={"기타"}>기타</option>
          </select>
          <input
            value={withName}
            onChange={(e) => setWithName(e.target.value)}
            className="textIn"
          />
        </div>
        <div className="visitBox">
          <h4 className="minititle">방문한 곳</h4>
          <select
            value={placeOption}
            onChange={(e) => setPlaceOption(e.target.value)}
          >
            <option value={"집"}>집</option>
            <option value={"식당"}>식당</option>
            <option value={"카페"}>카페</option>
            <option value={"체험장"}>체험장</option>
            <option value={"놀거리"}>놀거리</option>
            <option value={"기타"}>기타</option>
          </select>
          <input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="textIn"
          />
        </div>
        <div className="writeBox">
          <h4 className="minititle">간직하고 싶은 일</h4>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="writeDo"
          />
        </div>
        <button onClick={handleSave} className="saveBtn">
          {isEditing ? "저장" : "삭제"}
        </button>
      </div>
    </div>
  );
}
