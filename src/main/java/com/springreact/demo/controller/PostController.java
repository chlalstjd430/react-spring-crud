package com.springreact.demo.controller;

import com.springreact.demo.entity.Post;
import com.springreact.demo.request.PostRequest;
import com.springreact.demo.service.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostRepository postRepository;

    @GetMapping
    public Page<Post> getPosts(
        @RequestParam(required = false, defaultValue = "0")  int currentPage,
        @RequestParam(required = false, defaultValue = "10") int size
    ) {
        return postRepository.findAll(PageRequest.of(currentPage, size, Sort.by("createdDate").ascending()));
    }

    @GetMapping("/{postId}")
    public Post getPost(@PathVariable Long postId) {
        return postRepository.findById(postId).orElseThrow(NullPointerException::new);
    }

    @PatchMapping("/{postId}")
    public Post updatePost(@PathVariable Long postId, @RequestBody PostRequest postRequest) {
        Post post = postRepository.findById(postId).orElseThrow(NullPointerException::new);
        post.setContent(postRequest.getContent());
        post.setTitle(postRequest.getTitle());

        return postRepository.save(post);
    }

    @DeleteMapping("/{postId}")
    public void updatePost(@PathVariable Long postId) {
        postRepository.deleteById(postId);
    }

    @PostMapping("/post")
    public Post createPost(@RequestBody PostRequest postRequest) {
        Post post = Post.builder()
            .content(postRequest.getContent())
            .title(postRequest.getTitle())
            .build();

        return postRepository.save(post);
    }

}
