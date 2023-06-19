const express = require('express'); // Express 라이브러리를 불러옵니다.
const path = require('path');   // Node.js의 내장 모듈인 path를 불러옵니다.
const app = express();  // Express 애플리케이션을 생성합니다.

const MongoClient = require('mongodb').MongoClient; // MongoDB와 연결하기 위해 MongoClient를 불러옵니다.

const fs = require('fs'); // Node.js의 내장 모듈인 fs를 불러옵니다.

const passport = require('passport'); // 사용자 인증을 위한 Passport 라이브러리를 불러옵니다.
const LocalStrategy = require('passport-local').Strategy; // Passport의 LocalStrategy를 불러옵니다. 이는 아이디와 비밀번호를 사용한 로컬 인증을 제공합니다.
const session = require('express-session'); // Express 세션을 사용하기 위해 express-session 라이브러리를 불러옵니다.

// MongoDB에 연결하고, 연결된 클라이언트를 이용해 Express 애플리케이션을 8080 포트에서 실행합니다.
var db;
MongoClient.connect('mongodb+srv://???:???@???.mkmjypu.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, function (err, client) {
    if (err) return console.log(err)
    db = client.db('kiosk');

    app.listen(8080, function () {
        console.log('listening on 8080')
    })
})

const publicFolderPath = path.join(__dirname, 'public');  // 정적 파일을 제공할 폴더의 경로를 설정합니다.
const dataFilePath = path.join(publicFolderPath, 'data.json');  // 데이터 파일의 경로를 설정합니다.

// 루트 경로에 대한 GET 요청을 처리하는 핸들러입니다. 데이터 파일을 읽어서 MongoDB의 'seats' 컬렉션에 저장합니다.
app.get('/', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        db.collection('seats').drop(function (err, result) {
            if (err) {
                console.error('Failed to drop collection:', err);
                return;
            }

            console.log('seats dropped successfully.');

            // 여기에서 다음 작업 수행
        });

        // 데이터를 성공적으로 읽은 경우, 데이터를 JSON 형식으로 파싱(JSON문자열을 JS객체로 변환)하여 seatsData 변수에 할당
        // JSON 데이터를 파싱하여 JavaScript 객체로 변환하려면 JSON.parse() 메서드를 사용
        const seatsData = JSON.parse(data);
        const seatsCollection = db.collection('seats');

        seatsData.seats.forEach(seat => {
            seatsCollection.insertOne(seat, (err) => {
                if (err) {
                    console.error('Error saving data to MongoDB:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
            });
        })
        // 데이터를 MongoDB에 저장
        res.json({ data: '' });
    });
});

// '/api/senddata' 경로에 대한 GET 요청을 처리하는 핸들러입니다. 'seats' 컬렉션의 데이터를 가져와 응답합니다.
app.get('/api/senddata', (req, res) => {
    db.collection('seats').find({}).sort({ id: 1 }).toArray(function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: '서버 에러' });
        }

        // 처리할 내용 작성

        res.json({ data: results });
    });
});

app.use(express.json());    //  Express 애플리케이션에서 JSON 형식의 요청을 파싱하기 위해 미들웨어를 사용합니다.

// 서버 터미널에서 npm install cors
// Express 애플리케이션에 CORS(Cross-Origin Resource Sharing) 미들웨어를 사용하여 다른 도메인 간의 AJAX 요청을 허용합니다.
var cors = require('cors');
app.use(cors());

// 정적 파일을 제공하기 위해 Express에 정적 파일 경로를 설정합니다.
app.use(express.static(path.join(__dirname, '../frontend/build')));

// 루트 경로에 대한 GET 요청을 처리하는 핸들러입니다. 클라이언트에게 ../frontend/build/index.html 파일을 전송합니다.
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// `passport.authenticate('local', {failureRedirect : '/fail'})` 는 passport 라는 라이브러리가 제공하는 '아이디 비번 인증도와주는 코드'
// 응답해주기 전에 local 방식으로 아이디 비번을 인증해주세요 라는 뜻
// failureRedirect라는 부분은 로그인 인증 실패시 이동시켜줄 경로

// 세션을 사용하기 위해 express-session 미들웨어를 등록합니다. 비밀코드를 사용하여 세션을 암호화하고, 변경사항이 있을 때마다 세션을 저장합니다.
app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));
// Passport를 초기화합니다. Passport는 사용자 인증을 도와주는 라이브러리입니다.
app.use(passport.initialize());
// Passport를 세션과 함께 사용하도록 설정합니다.
app.use(passport.session());

// '/api/join' 경로에 대한 POST 요청을 처리하는 핸들러입니다. 클라이언트로부터 전달받은 회원 정보를 MongoDB의 'members' 컬렉션에 저장합니다.
app.post('/api/join', function (req, res) {
    db.collection('members').findOne({ id: req.body.phone }, function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: '서버 에러' });
        }

        if (result) {
            // 이미 존재하는 ID이므로 가입을 막음
            return res.status(400).json({ error: '이미 존재하는 ID입니다.' });
        }

        // ID가 존재하지 않으므로 가입 진행
        db.collection('members').insertOne({
            id: req.body.phone,
            pw: req.body.password,
            name: req.body.userName,
            birth: req.body.birth,
            gender: req.body.gender,
            isLoggedIn: req.body.isLoggedIn,
            userValid: req.body.userValid,
            userType: req.body.userType,
            price: req.body.price,
            time: req.body.time,
            period: req.body.period,
            seatChoice: req.body.seatChoice,
            seat: req.body.seat,
            isAvailable: req.body.isAvailable,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            totalUseTime: req.body.totalUseTime,
            paymentDate: req.body.paymentDate,
            paymentType: req.body.paymentType
        }, function (err, result) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: '서버 에러' });
            }

            res.json({ data: '회원가입 완료됐습니다.' });
        });
    });
});

//  '/api/fail' 경로에 대한 GET 요청을 처리하는 핸들러입니다. 로그인 인증 실패 시 응답으로 "로그인 실패"를 전송합니다.
app.get('/api/fail', function (req, res) {
    res.status(401).json({ data: "로그인 실패" });
});

//  '/api/login' 경로에 대한 POST 요청을 처리하는 핸들러입니다. Passport를 사용하여 로그인 인증을 수행합니다. 인증 성공 시 사용자 정보와 "로그인 완료됐습니다." 메시지를 응답으로 전송합니다.
app.post('/api/login', passport.authenticate('local', {
    failureRedirect: '/api/fail'
}), function (req, res) {
    const userId = req.session.passport.user;
    console.log('로그인시작');
    db.collection('members').findOne({ id: userId }, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "서버 에러" });
        }

        if (!user) {
            return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
        }

        // 응답에 사용자 정보와 로그인 완료 메시지를 함께 전달합니다.
        res.json({ user: user, data: "로그인 완료됐습니다." });
    });
});

//  Passport의 LocalStrategy를 사용하여 아이디와 비밀번호를 이용한 로컬 인증을 수행하는 방법을 설정합니다. MongoDB의 'members' 컬렉션에서 아이디와 비밀번호를 확인하여 인증 결과를 반환합니다.
passport.use(new LocalStrategy({
    usernameField: 'phone',
    passwordField: 'password',
    session: true,
    passReqToCallback: false,
}, function (enteredID, enteredPW, done) {
    console.log(enteredID, enteredPW);
    db.collection('members').findOne({
        id: enteredID
    }, function (err, result) {

        if (err) {
            console.log('에러발생')
            console.error(err);
            return done(err)
        }

        if (!result) {
            console.error(result);
            return done(null, false, { message: '존재하지 않는 아이디입니다.' })
        }

        if (enteredPW == result.pw) {

            return done(null, result)
        } else {
            return done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
        }
    })
}));

// Passport의 serializeUser를 설정합니다. 사용자 객체를 세션에 저장할 때 사용자 아이디만 저장합니다.
passport.serializeUser(function (user, done) {
    done(null, user.id)
});
// Passport의 deserializeUser를 설정합니다. 세션에 저장된 사용자 아이디를 이용하여 사용자 정보를 조회합니다.
passport.deserializeUser(function (아이디, done) {
    db.collection('members').findOne({ id: 아이디 }, function (err, result) {
        done(null, result)
    })
});

// /api/onlog 경로에 대한 GET 요청을 처리하는 핸들러 함수입니다. 이 함수는 로그인 여부를 확인하는 isLoggedIn 미들웨어를 거친 후에 실행됩니다.
app.get('/api/onlog', isLoggedIn, function (req, res) {
    const userId = req.user.id;
    db.collection('members').findOne({ id: userId }, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "서버 에러" });
        }

        if (!user) {
            return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
        }

        // 로그인 완료 메시지와 사용자 정보를 함께 응답합니다.
        res.json({ user: user, message: "로그인 완료됐습니다." });
    });
});

// 로그인 상태를 확인하는 미들웨어 함수입니다. req.user 객체를 검사하여 사용자가 로그인한 경우 next()를 호출하고, 로그인하지 않은 경우 "로그인안하셨는데요?" 메시지를 응답으로 보냅니다.
function isLoggedIn(req, res, next) {
    if (req.user) {
        next()
    }
    else {
        res.send('로그인안하셨는데요?')
    }
}

// /api/updateLoggedInStatus 경로에 대한 POST 요청을 처리하는 핸들러 함수입니다. 클라이언트에서 전달받은 사용자 아이디를 이용하여 members 컬렉션에서 해당 사용자의 isLoggedIn 값을 true로 업데이트합니다.
app.post("/api/updateLoggedInStatus", function (req, res) {
    const userId = req.body.userId; // 클라이언트에서 전달한 사용자 아이디

    db.collection("members").updateOne(
        { id: userId },
        { $set: { isLoggedIn: true } },
        function (err, result) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "서버 에러" });
            }

            res.json({ data: "isLoggedIn 값 업데이트 완료" });
        }
    );
});




// /api/password 경로에 대한 POST 요청을 처리하는 핸들러 함수입니다. 클라이언트에서 전달받은 새로운 비밀번호와 사용자 아이디를 이용하여 members 컬렉션에서 해당 사용자의 비밀번호를 업데이트합니다.
app.post("/api/password", isLoggedIn, function (req, res) {
    const newPassword = req.body.newPassword;
    const userId = req.user.id; // 사용자의 아이디 가져오기

    db.collection("members").updateOne(
        { id: userId },
        { $set: { pw: newPassword } },
        function (err, result) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "서버 에러" });
            }

            res.json({ data: "비밀번호 변경 완료" });
        }
    );
});

// /api/logout 경로에 대한 GET 요청을 처리하는 핸들러 함수입니다. 로그아웃 요청이 들어오면 사용자의 isLoggedIn 값을 false로 업데이트하고, req.logout()을 호출하여 사용자를 로그아웃 처리합니다.
app.get("/api/logout", isLoggedIn, function (req, res) {
    console.log("로그아웃 진입!!");
    const userId = req.user.id;

    db.collection("members").updateOne(
        { id: userId },
        { $set: { isLoggedIn: false } },
        function (err, result) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "서버 에러" });
            }
        }
    );

    req.logout(() => {
        res.json({ message: "로그아웃 되었습니다." });
    }); // 사용자 로그아웃 처리

});


// /api/pay 경로에 대한 POST 요청을 처리하는 핸들러 함수입니다. 클라이언트에서 전달받은 결제 정보를 처리하여 members 컬렉션에서 해당 사용자의 데이터를 업데이트합니다.
app.post("/api/pay", function (req, res) {
    console.log('결제완료됨');
    console.log(req.body); // {selectedValue: 'x시간 x원' 'x주 x원'}
    console.log(req.body.selectedValue); // x시간 x원, x주 x원
    console.log(req.body.paymentState);

    // 세션에 저장된 사용자 정보에서 아이디 가져오기
    const userId = req.user.id;
    console.log(userId); // 00000000000

    db.collection('members').findOne({ id: userId }, function (err, result) {
        console.log(result);

        if (err) {
            console.error(err);
            return res.status(500).json({ error: '서버 에러' });
        }

        if (result) {
            // 선택된 값(selectedValue)을 사용자 데이터에 추가
            // result.selectedValue = req.body.selectedValue;
            result.price = req.body.selectedValue.split(" ")[1];
            // 현재 시간을 MongoDB에 저장
            const dateObj = new Date(req.body.currentTime);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const day = String(dateObj.getDate()).padStart(2, "0");
            const hours = String(dateObj.getHours()).padStart(2, "0");
            const minutes = String(dateObj.getMinutes()).padStart(2, "0");
            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
            result.paymentDate = formattedDate;

            if (req.body.selectedValue.includes("주")) {
                result.period = req.body.selectedValue.split(" ")[0];
                result.time = "";
                result.userType = "기간권";
                result.userValid = true;
            } else if (req.body.selectedValue.includes("시간")) {
                result.time = req.body.selectedValue.split(" ")[0];
                result.period = "";
                result.userType = "시간권";
                result.userValid = true;
            }

            // 결제 유형(paymentType)을 설정
            if (req.body.paymentType == 1) {
                result.paymentType = '카드';
            } else if (req.body.paymentType == 2) {
                result.paymentType = '계좌이체';
            }
            console.log(result);

            // endTime 값이 true일 경우에만 업데이트
            if (result.endTime) {
                console.log(`0. endTime은 ${result.endTime}입니다.`); // 2023-06-16 06:09. 통과

                const selectedValue = req.body.selectedValue;
                console.log(`selectedValue는 ${selectedValue}입니다.`); // 8주 250,000원. 통과

                const timeUnit = selectedValue.split(" ")[0]; // timeUnit에 시간 단위를 포함한 전체 문자열 저장
                const timeValue = parseInt(timeUnit); // 시간 단위에서 숫자만 추출

                let endTime = new Date(result.endTime);
                if (timeUnit.endsWith("주")) { // timeUnit이 "주"로 끝나는 경우 주 단위로 계산
                    const daysToAdd = timeValue * 7;
                    const millisecondsToAdd = daysToAdd * 24 * 60 * 60 * 1000;
                    endTime.setTime(endTime.getTime() + millisecondsToAdd);
                } else {
                    endTime.setHours(endTime.getHours() + timeValue); // 그 외에는 시간 단위로 계산
                }

                const year = endTime.getFullYear();
                const month = String(endTime.getMonth() + 1).padStart(2, "0");
                const day = String(endTime.getDate()).padStart(2, "0");
                const hours = String(endTime.getHours()).padStart(2, "0");
                const minutes = String(endTime.getMinutes()).padStart(2, "0");

                const formattedEndTime = `${year}-${month}-${day} ${hours}:${minutes}`;

                console.log(`2. endTime는 ${formattedEndTime}입니다.`);
                result.endTime = formattedEndTime;
            }



            // 사용자 데이터 업데이트
            db.collection('members').updateOne(
                { id: userId },
                { $set: result },
                function (err, result) {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: '서버 에러' });
                    }
                    res.json({ data: '결제 완료됐습니다.' });
                }
            );
        }
    });
});


app.get('/api/getTime', isLoggedIn, function (req, res) {
    const userId = req.user.id;

    db.collection('members').findOne(
        { id: userId },
        function (error, member) {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (!member) {
                return res.status(404).json({ message: 'Member not found' });
            }

            const time = member.time;

            res.json({ time });

            // else {
            //     res.status(400).json({ message: 'Time not available' });
            // }
        }
    );
});

app.get('/api/getPeriod', isLoggedIn, function (req, res) {
    const userId = req.user.id;

    db.collection('members').findOne(
        { id: userId },
        function (error, member) {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (!member) {
                return res.status(404).json({ message: 'Member not found' });
            }

            const period = member.period;


            res.json({ period });

            // else {
            //     res.status(400).json({ message: 'Period not available' });
            // }
        }
    );
});


app.post('/api/saveEntranceResult', isLoggedIn, (req, res) => {
    const endTime = req.body.endTime;
    const startTime = req.body.startTime;
    const userId = req.user.id;

    db.collection('members').findOne(
        { id: userId },
        function (error, member) {
            if (error) {
                console.error('Error connecting to MongoDB:', error);
                res.sendStatus(500);
                return;
            }

            db.collection('members').updateOne(
                { id: userId },
                { $set: { startTime: startTime, endTime: endTime } },
                function (err, result) {
                    if (err) {
                        console.error('Error saving entrance result:', err);
                        res.sendStatus(500);
                        return;
                    }
                    console.log('Entrance result saved successfully');
                    res.sendStatus(200);
                }
            );
        }
    );
});


// /api/enter 경로에 대한 POST 요청을 처리하는 핸들러 함수입니다. 사용자의 좌석 정보를 업데이트하고, 해당 좌석의 isavailable 값을 false로 업데이트합니다.
app.post('/api/enter', isLoggedIn, function (req, res) {
    const userId = req.user.id;
    const selectedSeatNumber = req.body.selectedSeatNumber;
    const currentTime = new Date();
    const formattedStartTime = currentTime.toLocaleString('en-US', { timeZone: 'Asia/Seoul', hour12: false })
        .replace(',', '')

    console.log(selectedSeatNumber);

    db.collection('members').findOne({ id: userId }, function (error, member) {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        const currentSeat = member.seat;

        if (!currentSeat) {
            // 이전 좌석 선택 없음
            db.collection('members').updateOne(
                { id: userId },
                { $set: { seat: selectedSeatNumber, seatChoice: true } },
                function (error) {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ message: 'Internal server error' });
                    }

                    db.collection('seats').updateOne(
                        { name: selectedSeatNumber },
                        { $set: { isavailable: false } },
                        function (error) {
                            if (error) {
                                console.error(error);
                                return res.status(500).json({ message: 'Internal server error' });
                            }

                            res.json({ message: 'Seat updated successfully', startTime: formattedStartTime });
                        }
                    );
                }
            );
        } else {
            // 이전 좌석 선택 있음
            db.collection('seats').updateOne(
                { name: currentSeat },
                { $set: { isavailable: true } },
                function (error) {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ message: 'Internal server error' });
                    }

                    db.collection('members').updateOne(
                        { id: userId },
                        { $set: { seat: selectedSeatNumber, seatChoice: true } },
                        function (error) {
                            if (error) {
                                console.error(error);
                                return res.status(500).json({ message: 'Internal server error' });
                            }

                            db.collection('seats').updateOne(
                                { name: selectedSeatNumber },
                                { $set: { isavailable: false } },
                                function (error) {
                                    if (error) {
                                        console.error(error);
                                        return res.status(500).json({ message: 'Internal server error' });
                                    }

                                    res.json({ message: 'Seat updated successfully', startTime: formattedStartTime });
                                }
                            );
                        }
                    );
                }
            );
        }
    });
});




app.get('/api/myinfo', isLoggedIn, function (req, res) {
    const userId = req.user.id;

    db.collection('members').findOne(
        { id: userId },
        function (error, member) {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (!member) {
                return res.status(404).json({ message: 'Member not found' });
            }

            const phoneNumber = member.id;
            const name = member.name;
            const birth = member.birth;
            const gender = member.gender;
            const type = member.userType;
            const seat = member.seat;
            const startTime = member.startTime;
            const endTime = member.endTime;
            const price = member.price;
            const paymentDate = member.paymentDate;
            const paymentType = member.paymentType;

            res.json({
                phoneNumber: phoneNumber,
                name: name,
                birth: birth,
                gender: gender,
                type: type,
                seat: seat,
                startTime: startTime,
                endTime: endTime,
                price: price,
                paymentDate: paymentDate,
                paymentType: paymentType,
            });
        }
    );
});


// app.post('/api/leave', function (req, res) {...}): /api/leave 경로에 대한 POST 요청을 처리하는 핸들러 함수입니다. 사용자의 좌석 정보를 업데이트하고, 해당 좌석의 isavailable 값을 false로 업데이트합니다.
app.post('/api/leave', function (req, res) {
    const userData = req.body.userData;
    console.log(userData); // { phoneInputValue: '00000000000', password: '0000' }

    // MongoDB에서 도큐먼트 찾기
    db.collection('members').findOne({ id: userData.phoneInputValue, pw: userData.password }, function (err, result) {
        if (err) {
            console.error(err);
            // 오류 처리
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!result) {
            // 도큐먼트가 없는 경우
            return res.status(404).json({ error: 'Document not found' });
        }
        // 

        // MongoDB에서 seats collection에 해당하는 name값을 찾아서 isavailable 값을 true로 업데이트하는 코드 추가
        db.collection('seats').updateOne({ name: result.seat }, { $set: { isavailable: true } }, function (err, updateResult) {
            if (err) {
                console.error(err);
                // 오류 처리
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (updateResult.modifiedCount === 0) {
                // 업데이트된 도큐먼트가 없는 경우
                return res.status(404).json({ error: 'Seat document not found' });
            }

            // 성공적으로 업데이트되었을 때 응답
            // return res.json({ message: 'Seat information updated' });
        });
        // 

        // 도큐먼트를 찾은 경우
        // result를 사용하여 원하는 작업 수행
        console.log(result);

        // 현재 시간에서 startTime 값을 뺀 값을 누적하여 totalUseTime에 저장
        const currentTime = new Date();
        console.log(currentTime);

        // 데이터베이스에서 가져온 시간 값
        const databaseTime = new Date(result.startTime);
        console.log(databaseTime);

        // 로컬 시간대와 UTC와의 차이 (분 단위)
        const timezoneOffset = currentTime.getTimezoneOffset();

        // 두 시간의 차이 계산 (밀리초 단위)
        const timeDifference2 = currentTime - databaseTime;
        // 밀리초를 시간, 분, 초 등의 단위로 변환
        const seconds = Math.floor(timeDifference2 / 1000) % 60;
        const minutes = Math.floor(timeDifference2 / (1000 * 60)) % 60;
        const hours = Math.floor(timeDifference2 / (1000 * 60 * 60)) % 24;
        const days = Math.floor(timeDifference2 / (1000 * 60 * 60 * 24));

        // 시간 차이를 문자열로 조합
        const formattedDifference2 = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;

        console.log(formattedDifference2);


        console.log(timeDifference2);
        // 밀리초를 날짜로 변환
        const diffDate2 = new Date(timeDifference2);

        const diffHours2 = diffDate2.getHours();
        const diffMinutes2 = diffDate2.getUTCMinutes();
        const diffSeconds2 = diffDate2.getUTCSeconds();

        // yyyymmdd 형식으로 표현
        const formattedDate = `${diffHours2}:${diffMinutes2}:${diffSeconds2}`;

        console.log(formattedDate);
        console.log('------------------------')

        const localTimeString = currentTime.toLocaleString();

        console.log(localTimeString);

        //const timeDifference = currentTime - new Date(result.startTime);
        const startTimeISO = result.startTime.replace(" ", "T") + ":00";
        const startlocaletime = new Date(startTimeISO).toLocaleString();
        const timeDifference = currentTime - new Date(startTimeISO);
        console.log(timeDifference.toLocaleString());
        console.log(currentTime, startTimeISO, timeDifference)
        // timeDifference을 날짜 문자열로 변환
        const diffDate = new Date(timeDifference);
        const diffHours = diffDate.getUTCHours();
        const diffMinutes = diffDate.getUTCMinutes();
        const diffSeconds = diffDate.getUTCSeconds();

        const formattedDifference = `${diffHours}:${diffMinutes}:${diffSeconds}`;

        console.log(formattedDifference);

        //console.log(timeDifference.toISOString());
        // result.totalUseTime += timeDifference;

        // ISO 8601 형식으로 날짜 및 시간 변환
        // const formattedDate = result.totalUseTime.toISOString().slice(0, 16).replace('T', ' ');

        // 좌석 정보 수정
        result.seatChoice = false;
        result.seat = "";
        result.totalUseTime = formattedDifference;
        result.startTime = "";
        result.endTime = "";
        result.isLoggedIn = false;

        // MongoDB에 수정된 도큐먼트 저장
        db.collection('members').save(result, function (err) {
            if (err) {
                console.error(err);
                // 오류 처리
                return res.status(500).json({ error: 'Internal server error' });
            }

            // 성공적으로 저장되었을 때 응답
            return res.json({ message: 'Seat information updated' });
        });



    });
});



// Express 애플리케이션에서 모든 경로에 대한 GET 요청을 처리하는 핸들러 함수입니다. 이 핸들러 함수는 클라이언트에게 ../frontend/build/index.html 파일을 전송하여 클라이언트의 브라우저에서 해당 파일을 렌더링하도록 합니다.
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});