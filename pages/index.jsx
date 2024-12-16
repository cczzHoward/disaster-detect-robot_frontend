import Layout from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col text-center">
            <h1 className="display-4 mb-4">Welcome to the Home Page</h1>
            <p className="lead mb-4">
              歡迎來到我們的火災偵測系統。本系統旨在協助實時監控並偵測潛在的森林火災。透過先進的機器學習與影像辨識技術，系統能夠即時識別圖片或實時影像中的煙霧或火焰，並進行警報。
            </p>
            <p className="mb-4">
              我們的系統能夠幫助森林管理機構、緊急應變單位等組織，在火災危險發生時即刻採取行動，有效降低風險並保護環境。
            </p>
            <hr className="my-4" />
            <p className="mb-4">
              馬上點擊下方開始訓練AI，協助提升我們的火災偵測準確度，並為您的環境提供更多保障。
            </p>
            <a className="btn btn-dark btn-lg" href="/training" role="button">立即開始訓練！</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}