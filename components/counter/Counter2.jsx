const Counter2 = () => {
  return (
    <div className="row y-gap-30 text-dark-1 justify-center">
      <div className="col-sm-5 col-6">
        <div className="text-30 lh-15 fw-600">+1000</div>
        <div className="lh-15">Clients Satisfaits</div>
      </div>
      {/* End .col */}

      <div className="col-sm-5 col-6">
        <div className="text-30 lh-15 fw-600">4.88</div>
        <div className="lh-15">Notes</div>
        <div className="d-flex x-gap-5 items-center pt-10">
          <div className="icon-star text-dark-1 text-10" />
          <div className="icon-star text-dark-1 text-10" />
          <div className="icon-star text-dark-1 text-10" />
          <div className="icon-star text-dark-1 text-10" />
          <div className="icon-star text-dark-1 text-10" />
        </div>
      </div>
    </div>
  );
};

export default Counter2;
