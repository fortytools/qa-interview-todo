require 'rails_helper'

RSpec.describe LabelsController, type: :request do
  let!(:label) { create(:label) }

  describe "GET /labels" do
    it "returns a success response" do
      get labels_url, as: :json
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /labels" do
    let(:valid_attributes) { { color: label.color, value: label.value } }

    it "creates a new Label" do
      expect {
        post labels_url, params: { label: valid_attributes }, as: :json
      }.to change(Label, :count).by(1)
      expect(response).to have_http_status(:created)
    end
  end

  describe "GET /labels/:id" do
    it "returns a success response" do
      get label_url(label), as: :json
      expect(response).to have_http_status(:success)
    end
  end

  describe "PATCH /labels/:id" do
    let(:new_attributes) { { color: label.color, value: label.value } }

    it "updates the requested label" do
      patch label_url(label), params: { label: new_attributes }, as: :json
      expect(response).to have_http_status(:success)
    end
  end

  describe "DELETE /labels/:id" do
    it "destroys the requested label" do
      expect {
        delete label_url(label), as: :json
      }.to change(Label, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
