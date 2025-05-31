document.addEventListener('DOMContentLoaded', () => {
    const regionInput = document.getElementById('regionInput');
    const searchButton = document.getElementById('searchButton');
    const laundryListDiv = document.getElementById('laundryList');

    // 빨래방 데이터 (수동으로 관리할 데이터)
    // 실제 운영 시에는 이 배열을 더 많은 데이터로 채워야 합니다.
    const laundryData = [
        {
            id: 'laundry1',
            name: '워시팡팡 역삼점',
            region: '역삼동',
            address: '서울 강남구 역삼로 123번길 45',
            hours: '24시간 연중무휴',
            contact: '02-1234-5678',
            prices: [
                { type: '세탁 (코스)', capacity: '10kg', standard: '4,000원', premium: '5,000원' },
                { type: '세탁 (코스)', capacity: '20kg', standard: '6,000원', premium: '7,500원' },
                { type: '건조 (10분)', capacity: '10kg', standard: '1,000원', premium: '1,500원' },
                { type: '건조 (10분)', capacity: '20kg', standard: '1,500원', premium: '2,000원' }
            ],
            note: '세제/섬유유연제 자동 투입. 운동화 세탁 가능.'
        },
        {
            id: 'laundry2',
            name: '뽀송빨래방 신림점',
            region: '신림동',
            address: '서울 관악구 신림중앙로 789',
            hours: '오전 6시 ~ 밤 12시',
            contact: '02-9876-5432',
            prices: [
                { type: '세탁', capacity: '10kg', standard: '3,500원' },
                { type: '세탁', capacity: '15kg', standard: '5,000원' },
                { type: '건조 (5분)', capacity: '15kg', standard: '500원' }
            ],
            note: '멤버십 카드 결제 시 10% 할인.'
        },
        {
            id: 'laundry3',
            name: '클린업 뚝섬점',
            region: '성수동', // 뚝섬역 근처는 성수동이 많습니다.
            address: '서울 성동구 아차산로 100',
            hours: '24시간 연중무휴',
            contact: '02-2345-6789',
            prices: [
                { type: '세탁', capacity: '9kg', standard: '3,000원' },
                { type: '세탁', capacity: '18kg', standard: '5,500원' },
                { type: '건조 (5분)', capacity: '10kg', standard: '500원' },
                { type: '건조 (5분)', capacity: '20kg', standard: '1,000원' }
            ],
            note: '와이파이, 충전 시설 완비.'
        },
        {
            id: 'laundry4',
            name: '빨래OK 삼성점',
            region: '삼성동',
            address: '서울 강남구 삼성로 456',
            hours: '오전 7시 ~ 밤 11시',
            contact: '02-1111-2222',
            prices: [
                { type: '세탁 (표준)', capacity: '12kg', standard: '4,500원' },
                { type: '세탁 (이불)', capacity: '22kg', standard: '7,000원' },
                { type: '건조 (10분)', capacity: '12kg', standard: '1,200원' },
                { type: '건조 (10분)', capacity: '22kg', standard: '1,800원' }
            ],
            note: '매주 화요일 10% 할인 이벤트.'
        }
    ];

    // 검색 함수
    const searchLaundries = () => {
        const searchTerm = regionInput.value.trim().toLowerCase();
        laundryListDiv.innerHTML = ''; // 기존 목록 초기화

        if (!searchTerm) {
            laundryListDiv.innerHTML = '<p class="no-results">지역을 입력하여 빨래방을 검색해주세요.</p>';
            return;
        }

        const filteredLaundries = laundryData.filter(laundry =>
            laundry.region.toLowerCase().includes(searchTerm)
        );

        if (filteredLaundries.length === 0) {
            laundryListDiv.innerHTML = `<p class="no-results">'${regionInput.value}' 지역에 해당하는 빨래방을 찾을 수 없습니다. 다른 지역으로 검색해보세요.</p>`;
            return;
        }

        filteredLaundries.forEach(laundry => {
            const card = document.createElement('div');
            card.className = 'laundry-card';

            let priceTableHtml = `
                <table class="price-table">
                    <thead>
                        <tr>
                            <th>구분</th>
                            <th>용량</th>
                            <th>기본 가격</th>
                            ${laundry.prices.some(p => p.premium) ? '<th>프리미엄 가격</th>' : ''}
                        </tr>
                    </thead>
                    <tbody>
            `;
            laundry.prices.forEach(price => {
                priceTableHtml += `
                    <tr>
                        <td>${price.type}</td>
                        <td>${price.capacity}</td>
                        <td>${price.standard}</td>
                        ${price.premium ? `<td>${price.premium}</td>` : ''}
                    </tr>
                `;
            });
            priceTableHtml += `
                    </tbody>
                </table>
            `;

            card.innerHTML = `
                <div class="laundry-card-header">
                    ${laundry.name}
                </div>
                <div class="laundry-card-body">
                    <h3>${laundry.name}</h3>
                    <div class="laundry-info">
                        <p><i class="fas fa-map-marker-alt"></i> <strong>주소:</strong> ${laundry.address}</p>
                        <p><i class="fas fa-clock"></i> <strong>영업시간:</strong> ${laundry.hours}</p>
                        <p><i class="fas fa-phone"></i> <strong>연락처:</strong> ${laundry.contact}</p>
                    </div>
                    ${priceTableHtml}
                    ${laundry.note ? `<p class="note"><i class="fas fa-info-circle"></i> ${laundry.note}</p>` : ''}
                </div>
            `;
            laundryListDiv.appendChild(card);
        });
    };

    // 검색 버튼 클릭 이벤트
    searchButton.addEventListener('click', searchLaundries);

    // Enter 키로 검색 (입력 필드에서)
    regionInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchLaundries();
        }
    });

    // 초기 로딩 시 기본 메시지 표시
    laundryListDiv.innerHTML = '<p class="no-results">검색 결과를 기다리고 있습니다. 지역을 검색해주세요!</p>';
});