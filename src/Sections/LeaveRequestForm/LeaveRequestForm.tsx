const LeaveRequestForm = () => {
    return (
      <section id="leave-request" className="leave-request-form">
        <div className="leave-request-form__wrapper">
            <div className="leave-request-form__content">
                <h2 className="leave-request-form__title">Оставить заявку</h2>
                <div className="leave-request-form__input-container">
                    <input
                      type="text"
                      placeholder="Имя"
                      className="leave-request-form__input"
                    />
                </div>
                <div className="leave-request-form__input-container">
                    <input
                      type="text"
                      placeholder="Телефон"
                      className="leave-request-form__input"
                    />
                </div>
                <div className="leave-request-form__input-container">
                    <input
                      type="text"
                      placeholder="С чем могу помочь?"
                      className="leave-request-form__input"
                    />
                </div>            

                <button type="button" className="leave-request-form__button">
                    <p className="leave-request-form__text">Отправить</p>
                </button>
            </div>
        </div>
      </section>
    );
};

export default LeaveRequestForm;

  
  