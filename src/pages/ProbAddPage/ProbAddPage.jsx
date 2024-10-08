import { Checkbox, message } from "antd";
import Axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../components/Config";
import DragNDrop from "../../components/views/Audio/Sections/DragNDrop";
import FileRead from "../../components/views/Audio/Sections/FileRead";
import FileUpload from "../../components/views/Fileload/FileUpload";
import LoadingPage from "../../components/views/Loading/LoadingPage";
import NavBar from "../../components/views/NavBar/NavBar";
import ProfessorBreadcrumb from "../../components/views/commons/ProfessorBreadcrumb";

const Startlanguage = [
  { value: "jp", label: "일본어" },
  { value: "ko", label: "한국어" },
  { value: "cn", label: "중국어" },
  // { value: "en", label: "영어" },
  // { value: "fr", label: "불어" },
];

const Endlanguage = [
  { value: "ko", label: "한국어" },
  { value: "jp", label: "일본어" },
  { value: "cn", label: "중국어" },
];

const AssignmentOption = [
  { value: "순차통역", label: "순차 통역" },
  { value: "동시통역", label: "동시 통역" },
  { value: "번역", label: "번역" },
];

const SpeedOption = [
  { value: 1.0, label: "1배속" },
  { value: 0.5, label: "0.5배속" },
  { value: 0.7, label: "0.7배속" },
  { value: 0.8, label: "0.8배속" },
  { value: 1.25, label: "1.25배속" },
  { value: 1.5, label: "1.5배속" },
  { value: 1.75, label: "1.75배속" },
  { value: 2.0, label: "2배속" },
];

function ProbAddPage() {
  let navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const [Title, setTitle] = useState(""); // 과제 제목
  const [Description, setDescription] = useState(""); // 과제 설명
  const [CreateTime, setCreateTime] = useState(""); // 게시일
  const [LimitTime, setLimitTime] = useState(""); // 마감일
  const [Startlanguagelist, setStartlanguagelist] = useState("jp"); // 출발언어
  const [Endlanguagelist, setEndlanguagelist] = useState("ko"); // 도착언어
  const [Assignmentlist, setAssignmentlist] = useState("순차통역"); // 타입 (번역, 순차, 동시)
  const [Speedlist, setSpeedlist] = useState(1.0); // 재생 속도
  const [Txtread, setTxtread] = useState(""); // 원본
  const [Urlfile, setUrlfile] = useState(""); // 음원 파일 url
  const [regions, setRegions] = useState([]); // 구간
  const [regionsCopy, setRegionsCopy] = useState([]); // 서버에 보내지는 구간
  const [Music, setMusic] = useState(""); // 음원
  const [Modregions, setModregions] = useState([]); // 수정에 필요한 구간
  const [ReferenceName, setReferenceName] = useState(""); // 참고자료 이름
  const [ReferenceFileURL, setReferenceFileURL] = useState(""); // 참고자료 URL
  const [RecordCount, setRecordCount] = useState(0); // 녹음 횟수
  const [isChecked, setisChecked] = useState(false); // 무제한 설정 시
  const [Keyword, setKeyword] = useState(""); // 키워드 설정
  const [Loading, setLoading] = useState(false); // 로딩
  const [fileList, setFileList] = useState(null); // 파일 리스트

  // 과제 제목 설정
  const onTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  // 과제 설명 설정
  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  // 마감일 설정
  const onLimitChange = (e) => {
    setLimitTime(e.currentTarget.value);
  };

  // 게시일 설정
  const onCreateTimeChange = (e) => {
    setCreateTime(e.currentTarget.value);
  };

  // 시작 언어 설정
  const onStartlanguageChange = (e) => {
    setStartlanguagelist(e.currentTarget.value);
  };

  // 도착 언어 설정
  const onEndlanguageChange = (e) => {
    setEndlanguagelist(e.currentTarget.value);
  };

  // 통역 타입 설정 (번역, 순차, 동시)
  const onAssignmentChange = (e) => {
    setAssignmentlist(e.currentTarget.value);
  };

  // 음원 속도 설정
  const onSpeedChange = (e) => {
    setSpeedlist(e.currentTarget.value);
  };

  // 녹음 무제한 선택
  const onRecordCheck = (e) => {
    if (e.target.checked) {
      setisChecked(true);
      setRecordCount(2100000000);
    } else {
      setisChecked(false);
      setRecordCount(0);
    }
  };

  // 녹음 횟수 설정
  const onRecordcountChange = (e) => {
    setRecordCount(e.target.value);
  };

  //키워드 설정
  const onKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const onSaveButton = () => {
    // 입력 검증
    if (Title.length === 0) {
      return message.error("제목을 설정해주세요.");
    }
    if (Description.length === 0) {
      return message.error("과제 설명을 적어주세요.");
    }
    if (LimitTime.length === 0 || CreateTime.length === 0) {
      return message.error("과제 기한을 정해주세요.");
    }

    // 번역 과제가 아닐 때 추가적인 검증
    if (Assignmentlist !== "번역") {
      if (regionsCopy.length === 0) {
        return message.error("최소한 한 개 이상의 구간을 설정해주세요.");
      }
      if (Urlfile.length === 0) {
        return message.error(
          "음원 파일이 존재하지 않습니다. 음원을 추가해주세요."
        );
      }
      if (RecordCount <= 0) {
        return message.error("과제 횟수를 1회 이상 설정해주세요.");
      }
      if (Speedlist.length === 0) {
        return message.error("음원 속도를 설정해주세요.");
      }
    } else {
      // 번역 과제일 때 검증
      if (Txtread.length === 0) {
        return message.error("번역에는 원문이 필수입니다.");
      }
    }

    let finalRecordCount =
      Assignmentlist === "번역" ? 1000000 : parseInt(RecordCount);
    let body = {
      lecture_no: parseInt(lectureNo), //강의 번호
      as_name: Title, // 과제 제목
      as_type: Assignmentlist, // 과제 타입(순차, 동시, 번역)
      assign_count: finalRecordCount, // 녹음 횟수
      description: Description, // 과제 설명
      file_name: ReferenceName, // 참고자료 이름
      file_path: ReferenceFileURL, // 참고자료 경로
      keyword: Keyword, // 키워드
      keyword_open: 1, // 키워드 공개, 비공개
      limit_time: LimitTime, // 마감일
      open_time: CreateTime, // 게시일
      original_text: Txtread, // 원본
      prob_sound_path: Urlfile, // 음원 경로
      prob_split_region: regionsCopy, // 음원 구간
      prob_translang_source: Startlanguagelist, // 출발 언어
      prob_translang_destination: Endlanguagelist, // 도착 언어
      speed: Speedlist, // 음원 속도
    };
    setLoading(true);
    Axios.post(`${API_URL}api/prob/handle`, body, {
      withCredentials: true,
    })
      .then((response) => {
        setLoading(false);
        if (response.data.isSuccess) {
          message.success("과제를 생성했습니다.");
          navigate(`/prob/list/professor?lecture_no=${lectureNo}`);
        } else {
          message.error("과제 생성에 실패했습니다. 다시 시도해주세요.");
          navigate("/");
        }
      })
      .catch((error) => {
        // 요청이 실패한 경우의 처리
        message.error(error);
        navigate("/");
      });
  };
  return (
    <LectureBackgroudDiv>
      <NavBar />
      <ProfessorBreadcrumb />
      <div style={{ display: "flex" }}>
        {Loading ? <LoadingPage /> : null}
        <LectureBackDiv>
          <Link
            to={`/prob/list/professor?lecture_no=${lectureNo}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "9px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 -5 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </Link>
        </LectureBackDiv>
        <LectureTitleDiv>과제 생성하기</LectureTitleDiv>
      </div>
      <LectureAddFormDiv>
        <LectureNameDiv>
          <LectureName>과제 명</LectureName>
          <LectureNameinputDiv>
            <LectureNameinput
              type="text"
              placeholder=" 과제명을 적어주세요"
              size="10"
              maxlength="8"
              value={Title}
              onChange={onTitleChange}
            />
          </LectureNameinputDiv>
        </LectureNameDiv>
        <LectureHr />
        <LectureNameDiv>
          <LectureName>과제 종류</LectureName>
          <LectureNameinputDiv style={{ marginTop: "10px" }}>
            <select
              id="countries"
              className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block w-full p-2.5 "
              onChange={onAssignmentChange}
            >
              {AssignmentOption.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </LectureNameinputDiv>
        </LectureNameDiv>
        {Assignmentlist !== "번역" && (
          <div>
            <LectureHr />
            <LectureNameDiv>
              <LectureName>출발 언어</LectureName>
              <LectureNameinputDiv style={{ marginTop: "10px" }}>
                <select
                  id="countries"
                  className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block w-full p-2.5"
                  onChange={onStartlanguageChange}
                >
                  {Startlanguage.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </LectureNameinputDiv>
              <LectureName>도착 언어</LectureName>
              <LectureNameinputDiv style={{ marginTop: "10px" }}>
                <select
                  id="countries"
                  className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block w-full p-2.5"
                  onChange={onEndlanguageChange}
                >
                  {Endlanguage.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </LectureNameinputDiv>
            </LectureNameDiv>
          </div>
        )}
        <LectureHr />
        <LectureNameDiv>
          <LectureName>과제 게시일</LectureName>
          <LectureNameinputDiv style={{ marginTop: "7px" }}>
            <Purposeinput
              type="datetime-local"
              name="bday"
              onChange={onCreateTimeChange}
            />
          </LectureNameinputDiv>
        </LectureNameDiv>
        <LectureHr />
        <LectureNameDiv>
          <LectureName>과제 마감일</LectureName>
          <LectureNameinputDiv style={{ marginTop: "7px" }}>
            <Purposeinput
              type="datetime-local"
              name="bday"
              onChange={onLimitChange}
            />
          </LectureNameinputDiv>
        </LectureNameDiv>
        {Assignmentlist !== "번역" && (
          <div>
            <LectureHr />
            <LectureNameDiv>
              <LectureName>재생 속도</LectureName>
              <LectureNameinputDiv style={{ marginTop: "10px" }}>
                <select
                  id="countries"
                  className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block w-full p-2.5"
                  onChange={onSpeedChange}
                >
                  {SpeedOption.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </LectureNameinputDiv>
            </LectureNameDiv>

            <LectureHr />
            <LectureNameDiv>
              <LectureName>과제 횟수</LectureName>
              <LectureNameinputDiv>
                {isChecked === false && (
                  <RecordCountInput
                    type="number"
                    placeholder=" 녹음 횟수를 적어주세요. 예). 1회시 -> 1"
                    size="6"
                    maxlength="4"
                    value={RecordCount}
                    onChange={onRecordcountChange}
                  />
                )}
                <Checkbox
                  style={isChecked ? { marginTop: "20px" } : {}}
                  onChange={onRecordCheck}
                >
                  제한 없음
                </Checkbox>
              </LectureNameinputDiv>
            </LectureNameDiv>
          </div>
        )}
        <LectureHr />
        <LectureNameDiv>
          <LectureName>참고 자료</LectureName>
          <LectureNameinputDiv
            style={{ marginTop: "15px", marginLeft: "20px" }}
          >
            <FileUpload
              setReferenceName={setReferenceName}
              setReferenceFileURL={setReferenceFileURL}
              setFileList={setFileList}
              fileList={fileList}
            />
          </LectureNameinputDiv>
        </LectureNameDiv>
        {Assignmentlist !== "번역" && (
          <div>
            <LectureHr />
            <LectureNameDiv>
              <LectureName>키워드</LectureName>
              <LectureNameinputDiv>
                <ProbDescriptionTextarea
                  type="text"
                  placeholder="키워드를 작성해주세요."
                  rows="2"
                  cols="50"
                  value={Keyword}
                  onChange={onKeywordChange}
                />
              </LectureNameinputDiv>
            </LectureNameDiv>
          </div>
        )}
        <LectureHr />
        <LectureNameDiv>
          <LectureName>과제 설명</LectureName>
          <LectureNameinputDiv>
            <ProbDescriptionTextarea
              type="text"
              placeholder="과제 설명해주세요."
              rows="4"
              cols="50"
              value={Description}
              onChange={onDescriptionChange}
            />
          </LectureNameinputDiv>
        </LectureNameDiv>
        <LectureHr />

        {Assignmentlist !== "번역" && (
          <div>
            <ProbMusicDiv>
              <LectureName>과제 음원</LectureName>
              <LectureNameinputDiv>
                <DragNDrop
                  Urlfile={Urlfile}
                  setUrlfile={setUrlfile}
                  regions={regions}
                  setRegions={setRegions}
                  regionsCopy={regionsCopy}
                  setRegionsCopy={setRegionsCopy}
                  setMusic={setMusic}
                  Music={Music}
                  setModregions={setModregions}
                  Modregions={Modregions}
                />
              </LectureNameinputDiv>
            </ProbMusicDiv>
            <LectureHr />
          </div>
        )}

        <div>
          <FileRead setTxtreads={setTxtread} Txtreads={Txtread} />
        </div>
      </LectureAddFormDiv>
      <LectureCreateDiv>
        <LectureCreateButton onClick={onSaveButton}>
          생성하기
        </LectureCreateButton>
      </LectureCreateDiv>
    </LectureBackgroudDiv>
  );
}

export default ProbAddPage;

const LectureBackgroudDiv = styled.div`
  background-color: #f7f7fa;
  width: 100%;
  height: 100%;
`;

const LectureHr = styled.hr`
  background: #d3d3d3;
  height: 1px;
  border: 0;
`;

const LectureAddFormDiv = styled.div`
  border: 0.0625rem solid #e1e1e8;
  border-radius: 0.5rem;
  margin: auto;
  background-color: #ffffff;
  width: 800px;
  height: 100%;
  @media screen and (max-width: 830px) {
    width: auto;
    margin: 10px;
  }
`;

const LectureTitleDiv = styled.div`
  font-size: 1.5rem;
  line-height: 1.5;
  color: #2b2d36;
  font-weight: 700;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 17px;
`;

const LectureBackDiv = styled.div`
  background-color: #85889914;
  border-radius: 7px;
  margin: 20px;
  height: 34px;
  width: 40px;
  color: black;
`;

const LectureNameDiv = styled.div`
  font-size: 14px;

  display: flex;
  line-height: 1.5;
  color: #525364;
  width: 95%;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  margin: 17px;
  @media screen and (max-width: 830px) {
    margin: 11px;
  }
`;

const ProbMusicDiv = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #525364;
  width: 95%;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  margin: 17px;
  @media screen and (max-width: 830px) {
    margin: 11px;
  }
`;

const RecordCountInput = styled.input`
  width: 80%;
  height: 48px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 10px;
  margin-right: 10px;
  box-sizing: border-box;
  margin-bottom: 8px;
  border: solid 1px #d3d3d3;
  border-radius: 9px;
  background-color: #ffffff;
  &:focus {
    outline: 2px solid #04653d;
  }
`;

const LectureNameinput = styled.input`
  width: 100%;
  height: 48px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 10px;
  margin-right: 10px;
  box-sizing: border-box;
  margin-bottom: 8px;
  border: solid 1px #d3d3d3;
  border-radius: 9px;
  background-color: #ffffff;
  &:focus {
    outline: 2px solid #04653d;
  }
`;

const ProbDescriptionTextarea = styled.textarea`
  width: 100%;
  padding: 20px;
  white-space: pre-wrap;
  margin-top: 10px;
  margin-right: 10px;
  box-sizing: border-box;
  margin-bottom: 8px;
  border: solid 1px #d3d3d3;
  resize: vertical;
  background-color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.375rem;
  border-radius: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;

  &:focus {
    outline: 2px solid #04653d;
  }
`;

const Purposeinput = styled.input`
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  border: solid 1px #d3d3d3;
  border-radius: 9px;
  background-color: #ffffff;
  padding-left: 20px;
  padding-right: 20px;
  &:focus {
    outline: 2px solid #04653d;
  }
`;

const LectureNameinputDiv = styled.div`
  flex-grow: 2;
`;

const LectureName = styled.div`
  margin: 20px;
  flexgrow: 1;
  fontweight: 500;
`;

const LectureCreateDiv = styled.div`
  position: fixed;
  bottom: 0px;
  z-index: 8;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 4rem;
  background: rgb(255, 255, 255);
  box-shadow: rgb(232, 232, 238) 0px 1px 0px inset;
`;

const LectureCreateButton = styled.button`
  height: 3rem;
  font-size: 0.975rem;
  font-weight: 800;
  line-height: 1.375rem;
  width: 100%;
  border-radius: 0.5rem;
  margin: 20px;
  color: #fff;
  background-color: #2e462f;
  border-color: transparent;
`;
