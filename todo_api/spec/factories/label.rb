FactoryBot.define do
  factory :label do
    value { Faker::Lorem.word }
    color { Faker::Color.hex_color }
  end
end