require "test_helper"

class TodosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @todo = todos(:one)
  end

  test "should get index" do
    get todos_url, as: :json
    assert_response :success
  end

  test "should create todo" do
    assert_difference("Todo.count") do
      post todos_url, params: { todo: { due_at: @todo.due_at, label_id: @todo.label_id, title: @todo.title } }, as: :json
    end

    assert_response :created
  end

  test "should show todo" do
    get todo_url(@todo), as: :json
    assert_response :success
  end

  test "should update todo" do
    patch todo_url(@todo), params: { todo: { due_at: @todo.due_at, label_id: @todo.label_id, title: @todo.title } }, as: :json
    assert_response :success
  end

  test "should destroy todo" do
    assert_difference("Todo.count", -1) do
      delete todo_url(@todo), as: :json
    end

    assert_response :no_content
  end
end
