<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $user->full_name ?? 'My Profile' }}</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

    <style>
        body {
            background-color: #0b132b; /* To‘q ko‘k */
            color: #fff;
        }
        section {
            padding: 80px 0;
        }
        .navbar {
            background-color: #1c2541 !important;
        }
        .btn-info {
            background-color: #3a506b;
            border: none;
        }
        .btn-info:hover {
            background-color: #5bc0be;
            color: #000;
        }
    </style>
</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark fixed-top shadow">
    <div class="container">
        <a class="navbar-brand fw-bold text-info" href="#">{{ $user->full_name }}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto fw-semibold">
                <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
                <li class="nav-item"><a class="nav-link" href="#projects">Projects</a></li>
                <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
            </ul>
        </div>
    </div>
</nav>

<!-- Hero -->
<header class="vh-100 d-flex align-items-center justify-content-center text-center">
    <div>
        <img src="{{ asset('images/profilephoto1.jpg') }}" alt="Profile" class="rounded-circle border border-4 border-info shadow mb-4" width="200" height="200">
        <h1 class="display-3 fw-bold text-info">{{ $user->full_name }}</h1>
        <p class="lead mb-4">{{ $user->position }} | {{ $user->experience }} tajriba</p>
        <a href="{{ asset('storage/resumes/Sardorbek_Ergashev.pdf') }}" class="btn btn-info btn-lg fw-bold" download>Download CV</a>
    </div>
</header>

<!-- About -->
<section id="about">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <h2 class="text-info fw-bold mb-3">About Me</h2>
                <ul class="list-unstyled">
                    <li><strong>Name:</strong> {{ $user->full_name }}</li>
                    <li><strong>Title:</strong> {{ $user->position }}</li>
                    <li><strong>Experience:</strong> {{ $user->experience }}</li>
                </ul>
                <p class="mt-3">{{ $user->about }}</p>
            </div>
            <div class="col-md-6">
                <img src="{{ asset('images/about-photo.jpg') }}" class="img-fluid rounded shadow" alt="About Me">
            </div>
        </div>
    </div>
</section>

<!-- Services -->
<section id="services" class="bg-dark">
    <div class="container">
        <h2 class="text-center mb-5 text-info fw-bold">Our Services</h2>
        <div class="row g-4">

            <div class="col-md-4">
                <div class="card bg-secondary text-center h-100 shadow-lg border-0">
                    <div class="card-body">
                        <div class="mb-3 text-info fs-1"><i class="bi bi-layers"></i></div>
                        <h5 class="card-title fw-bold">Full Stack Development</h5>
                        <p class="card-text">Frontend + backend integration, database, APIs, deployment.</p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card bg-secondary text-center h-100 shadow-lg border-0">
                    <div class="card-body">
                        <div class="mb-3 text-info fs-1"><i class="bi bi-server"></i></div>
                        <h5 class="card-title fw-bold">Backend Services</h5>
                        <p class="card-text">Secure & scalable APIs, authentication, business logic, PostgreSQL.</p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card bg-secondary text-center h-100 shadow-lg border-0">
                    <div class="card-body">
                        <div class="mb-3 text-info fs-1"><i class="bi bi-code-slash"></i></div>
                        <h5 class="card-title fw-bold">Frontend Services</h5>
                        <p class="card-text">Responsive UI/UX with Bootstrap and React, user-friendly design.</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- Projects -->
<section id="projects">
    <div class="container">
        <h2 class="text-center mb-5 text-info fw-bold">My Projects</h2>
        <div class="row g-4">
            <div class="col-md-6">
                <div class="card bg-secondary text-light shadow-lg border-0">
                    <img src="{{ asset('images/project1.jpg') }}" class="card-img-top" alt="Project 1">
                    <div class="card-body">
                        <h5 class="card-title">Project 1</h5>
                        <p class="card-text">Custom Telegram bots with dynamic data.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card bg-secondary text-light shadow-lg border-0">
                    <img src="{{ asset('images/project2.jpg') }}" class="card-img-top" alt="Project 2">
                    <div class="card-body">
                        <h5 class="card-title">Project 2</h5>
                        <p class="card-text">Django REST based productivity app with Pomodoro timers.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Contact -->
<section id="contact" class="bg-dark">
    <div class="container">
        <h2 class="text-center mb-5 text-info fw-bold">Contact Me</h2>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <form action="{{ route('connect.store') }}" method="POST" class="bg-secondary p-4 rounded shadow-lg">
                    @csrf
                    <div class="mb-3">
                        <label class="form-label">Name</label>
                        <input type="text" name="full_name" class="form-control" placeholder="Your Name" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" name="email" class="form-control" placeholder="Your Email" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Message</label>
                        <textarea name="message" rows="5" class="form-control" placeholder="Your Message"></textarea>
                    </div>
                    <button type="submit" class="btn btn-info fw-bold">Send Message</button>
                </form>
                <div class="text-center mt-4">
                    <p>Email: <a href="mailto:{{ $user->email }}" class="text-info">{{ $user->email }}</a></p>
                    <p>Phone: {{ $user->phone }}</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Footer -->
<footer class="py-3 text-center bg-secondary text-light">
    <p class="mb-0">&copy; {{ date('Y') }} {{ $user->full_name }}. All rights reserved.</p>
</footer>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
